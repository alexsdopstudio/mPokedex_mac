export interface Paginated {
    count: number;
    previous: null | string;
    next: null | string;
    results: Results[]
}

export interface Results {
    name: string;
    url: string;
}