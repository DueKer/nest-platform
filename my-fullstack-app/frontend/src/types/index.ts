export interface ExampleType {
    id: number;
    name: string;
    description?: string;
}

export type ApiResponse<T> = {
    data: T;
    message: string;
    status: number;
};