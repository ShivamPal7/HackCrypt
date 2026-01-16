
export interface User {
    id: string;
    name: string;
    avatarUrl: string;
}

export interface AttendanceStats {
    semesterLabel: string;
    percentage: number;
    targetPercentage: number;
    presentDays: number;
    absentDays: number;
    status: 'On Track' | 'At Risk' | 'Off Track';
}

export interface ClassSession {
    id: string;
    title: string;
    location: string;
    startTime: string; // ISO string or specific time string e.g., "09:00 AM"
    durationMinutes?: number;
    statusLabel?: string; // e.g. "STARTS IN 5M"
    type: 'lecture' | 'lab' | 'remote';
    iconName: 'function' | 'laptop' | 'history'; // Mapping to icon names
}

export interface TabRoute {
    name: string;
    label: string;
    icon: string;
}
