import { Feather, Ionicons } from '@expo/vector-icons';
import * as FaceDetector from 'expo-face-detector';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import { CustomModal, ModalOption, ModalType } from '../ui/CustomModal';

interface FaceVerificationProps {
    images: string[];
    onImagesChange: (images: string[]) => void;
    maxImages?: number;
}

export const FaceVerification = ({ images, onImagesChange, maxImages = 5 }: FaceVerificationProps) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Modal State
    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        type: 'alert' as ModalType,
        title: '',
        message: '',
        options: [] as ModalOption[],
        onConfirm: undefined as (() => void) | undefined,
        confirmText: 'OK'
    });

    const showModal = (
        type: ModalType,
        title: string,
        message: string = '',
        options: ModalOption[] = [],
        onConfirm?: () => void,
        confirmText: string = 'OK'
    ) => {
        setModalConfig({ type, title, message, options, onConfirm, confirmText });
        setModalVisible(true);
    };

    const toggleAccordion = () => {
        Haptics.selectionAsync();
        setIsExpanded(!isExpanded);
    };

    const pickImage = async (camera: boolean = false) => {
        if (images.length >= maxImages) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            showModal('error', 'Limit Reached', `You need exactly ${maxImages} verification images.`);
            return;
        }

        try {
            let result;
            const options: ImagePicker.ImagePickerOptions = {
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            };

            if (camera) {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    showModal('error', 'Permission Needed', 'We need camera access to capture your face.');
                    return;
                }
                result = await ImagePicker.launchCameraAsync(options);
            } else {
                result = await ImagePicker.launchImageLibraryAsync(options);
            }

            if (!result.canceled && result.assets[0].uri) {
                verifyFace(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Image pick error", error);
            showModal('error', 'Error', 'Could not pick image.');
        }
    };

    const handleAddPhoto = () => {
        showModal(
            'action-sheet',
            'Upload Photo',
            'Choose how you want to add your photo',
            [
                {
                    label: 'Take Photo',
                    icon: 'camera',
                    onPress: () => pickImage(true)
                },
                {
                    label: 'Choose from Gallery',
                    icon: 'images',
                    onPress: () => pickImage(false)
                },
                {
                    label: 'Cancel',
                    isCancel: true,
                    onPress: () => { }
                }
            ]
        );
    };

    const verifyFace = async (uri: string) => {
        setIsProcessing(true);
        try {
            const faces = await FaceDetector.detectFacesAsync(uri, {
                mode: FaceDetector.FaceDetectorMode.fast,
                detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                runClassifications: FaceDetector.FaceDetectorClassifications.none,
            });

            if (faces.faces.length === 0) {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                showModal('error', 'No Face Detected', 'Please upload a clear image of your face.');
            } else if (faces.faces.length > 1) {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                showModal('error', 'Multiple Faces', 'Please ensure only you are in the photo.');
            } else {
                // Success
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                onImagesChange([...images, uri]);
            }
        } catch (error: any) {
            console.error("Face detection error", error);

            if (error.message && error.message.includes("Cannot find native module")) {
                showModal(
                    'alert',
                    'Dev Mode: Native Module Missing',
                    'ExpoFaceDetector is not available in your current client. Using MOCK verification for testing.',
                    [],
                    () => onImagesChange([...images, uri]),
                    'Use Mock Pass'
                );
            } else {
                showModal('error', 'Verification Error', 'Could not verify face presence. Please try again with better lighting.');
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const removeImage = (index: number) => {
        Haptics.selectionAsync();
        const newImages = [...images];
        newImages.splice(index, 1);
        onImagesChange(newImages);
    };

    return (
        <>
            <View className="bg-card w-full rounded-2xl border border-border mb-4 overflow-hidden">
                <TouchableOpacity
                    onPress={toggleAccordion}
                    className="p-4 flex-row items-center justify-between"
                    activeOpacity={0.7}
                >
                    <View className="flex-1 mr-4">
                        <Text className="text-muted-foreground text-[10px] font-inter-bold uppercase tracking-wider mb-1">
                            Face Verification
                        </Text>
                        <Text className={`font-inter-bold text-lg ${images.length === maxImages ? 'text-green-500' : 'text-foreground'}`}>
                            {images.length}/{maxImages} Completed
                        </Text>
                    </View>
                    <View className="h-10 w-10 bg-muted/10 rounded-full items-center justify-center">
                        <Feather name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color="#9AA4B2" />
                    </View>
                </TouchableOpacity>

                {isExpanded && (
                    <Animated.View
                        entering={FadeIn.duration(300)}
                        exiting={FadeOut.duration(200)}
                        layout={Layout.springify()}
                        className="px-4 pb-4"
                    >
                        <View className="h-[1px] bg-border/50 w-full mb-4" />

                        <Text className="text-muted-foreground text-sm font-inter mb-4 leading-relaxed">
                            Please upload {maxImages} distinct photos of your face for identity verification. Ensure good lighting and a clear view.
                        </Text>

                        {/* Image Grid */}
                        <View className="flex-row flex-wrap gap-3 mb-2">
                            {images.map((uri, index) => (
                                <View key={index} className="relative">
                                    <Image
                                        source={{ uri }}
                                        className="w-20 h-20 rounded-xl bg-muted border border-border"
                                    />
                                    <TouchableOpacity
                                        onPress={() => removeImage(index)}
                                        className="absolute -top-2 -right-2 bg-destructive rounded-full w-6 h-6 items-center justify-center border-2 border-background"
                                    >
                                        <Feather name="x" size={12} color="white" />
                                    </TouchableOpacity>
                                </View>
                            ))}

                            {/* Add Button Placeholder (if not full) */}
                            {images.length < maxImages && (
                                <TouchableOpacity
                                    className={`w-20 h-20 rounded-xl bg-card border border-dashed border-muted-foreground/30 items-center justify-center ${isProcessing ? 'opacity-50' : ''}`}
                                    onPress={handleAddPhoto}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? (
                                        <ActivityIndicator color="#6CFFC4" />
                                    ) : (
                                        <Feather name="plus" size={24} color="#9AA4B2" />
                                    )}
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Validation Message */}
                        {images.length < maxImages && images.length > 0 && (
                            <View className="flex-row items-center gap-2 mt-2">
                                <Ionicons name="warning-outline" size={16} color="#F59E0B" />
                                <Text className="text-yellow-500 text-xs font-inter-medium">
                                    {maxImages - images.length} more photo{maxImages - images.length !== 1 ? 's' : ''} needed.
                                </Text>
                            </View>
                        )}
                    </Animated.View>
                )}
            </View>

            <CustomModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                type={modalConfig.type}
                title={modalConfig.title}
                message={modalConfig.message}
                options={modalConfig.options}
                onConfirm={modalConfig.onConfirm}
                confirmText={modalConfig.confirmText}
            />
        </>
    );
};
