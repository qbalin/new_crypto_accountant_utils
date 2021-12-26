interface FetchResponse {
    data: any;
    response: Response;
}
export declare type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
declare const fetchJson: ({ url, method, headers, }: {
    url: string;
    method?: HttpMethod | undefined;
    headers?: Record<string, string> | undefined;
}) => Promise<FetchResponse>;
declare const groupBy: <T>(collection: T[], predicate: (arg: T) => string | number) => Record<string, T[]>;
declare const partition: <T>(collection: T[], predicate: (arg: T) => boolean) => T[][];
declare const uniq: <T>(collection: T[]) => T[];
declare const time: {
    (description: string, fn: (...args: any[]) => any): void;
    startTime: number;
    start: () => void;
    end: () => void;
};
declare class Heap<T> {
    array: {
        indexingValue: number;
        element: T;
    }[];
    constructor();
    value(index: number): number;
    peek(): T | null;
    get size(): number;
    private heapifyUp;
    private heapifyDown;
    push(element: T, indexingValue: number): void;
    pop(): T | null;
    private swap;
    private hasLeftChild;
    private hasRightChild;
    private static leftChildIndex;
    private static rightChildIndex;
    private static parentIndex;
}
declare const rateLimit: <Fn extends (...args: any) => any>({ callsPerMinute, fn }: {
    callsPerMinute: number;
    fn: Fn;
}) => (...args: Parameters<Fn>) => Promise<ReturnType<Fn>>;
declare const beginningOfYear: () => Date;
export { fetchJson, groupBy, uniq, time, Heap, rateLimit, beginningOfYear, partition, };
