import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClassesHeader } from '../../src/components/classes/ClassesHeader';
import { CourseCard } from '../../src/components/classes/CourseCard';
import { SearchBar } from '../../src/components/classes/SearchBar';
import { courses, currentUser } from '../../src/data/mock';

export default function ClassesScreen() {
    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <ScrollView
                className="flex-1 px-5"
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                <ClassesHeader user={currentUser} />

                <SearchBar />

                <View>
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
