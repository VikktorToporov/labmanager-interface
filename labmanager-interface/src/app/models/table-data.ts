export interface PatientViewResults {
    examinationType: string;

    completed: boolean;

    madeOnDate: Date | string;

    employee: {username: string};
}

export interface EmployeeViewResults {
    patientId: string;

    patient: string;

    test: string;

    status: string;

    date: Date | string;

    employee: string;
}

export interface  EmployeeViewPatients {
    patientId: string;

    patient: string;

    email: string;
}

export interface  EmployeeViewEmployees {
    employeeId: string;

    employee: string;

    email: string;
}