/* eslint-disable max-classes-per-file */
interface FetchResponse {
    data: any
    response: Response
}

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'

const fetchJson = async ({
  url,
  method = 'GET',
  headers = {},
}: {
    url: string,
    method?: HttpMethod,
    headers?: Record<string, string>
}) : Promise<FetchResponse> => {
  const response = await fetch(
    url,
    {
      method,
      headers: {
        'content-type': 'application/json',
        ...headers,
      },
      mode: 'cors'
    }
  );

  return {
    data: await response.json(),
    response,
  }
};

const groupBy = <T>(collection: T[], predicate: (arg: T) => string | number) => collection
  . reduce((memo, entry) => {
    // eslint-disable-next-line no-param-reassign
    memo[predicate(entry)] ||= [];
    memo[predicate(entry)].push(entry);
    return memo;
  }, {} as Record<string, T[]>);

const partition = <T>(collection: T[], predicate: (arg: T) => boolean) :
  T[][] => collection.reduce((memo, entry) => {
    if (predicate(entry)) {
      memo[0].push(entry);
    } else {
      memo[1].push(entry);
    }
    return memo;
  }, [[], []] as T[][]);

const uniq = <T>(collection: T[]) : T[] => Array.from(new Set(collection));

const time = (description: string, fn: (...args: any[]) => any) => {
  const start = +new Date();
  fn();
  const end = +new Date();
  console.log(`${description ? `${description}: ` : ''}${end - start}ms`);
};

time.startTime = +new Date();
time.start = (() => { time.startTime = +new Date(); });
time.end = (() => { console.log(`${+new Date() - time.startTime}ms`); });

class Heap<T> {
  array: { indexingValue: number, element: T}[];

  constructor() {
    this.array = [];
  }

  value(index: number) {
    return this.array[index].indexingValue;
  }

  peek() {
    return this.array[0]?.element || null;
  }

  get size() {
    return this.array.length;
  }

  private heapifyUp() {
    let currentIndex = this.size - 1;
    let parentIndex = Heap.parentIndex(currentIndex);
    while (parentIndex >= 0 && this.value(currentIndex) > this.value(parentIndex)) {
      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
      parentIndex = Heap.parentIndex(currentIndex);
    }
  }

  private heapifyDown() {
    if (this.size < 1) {
      return;
    }
    let currentIndex = 0;
    while (this.hasLeftChild(currentIndex)) {
      let maxChildIndex = Heap.leftChildIndex(currentIndex);
      let maxChildValue = this.value(maxChildIndex);
      if (this.hasRightChild(currentIndex)
        && this.value(Heap.rightChildIndex(currentIndex)) > maxChildValue) {
        maxChildIndex = Heap.rightChildIndex(currentIndex);
        maxChildValue = this.value(maxChildIndex);
      }
      if (maxChildValue > this.value(currentIndex)) {
        this.swap(currentIndex, maxChildIndex);
        currentIndex = maxChildIndex;
      } else {
        break;
      }
    }
  }

  push(element: T, indexingValue: number) {
    this.array.push({ indexingValue, element });
    this.heapifyUp();
  }

  pop() {
    const value = this.peek();
    this.array[0] = this.array[this.size - 1];
    this.array.pop();
    this.heapifyDown();
    return value;
  }

  private swap(index1: number, index2: number) {
    const temp = this.array[index2];
    this.array[index2] = this.array[index1];
    this.array[index1] = temp;
  }

  private hasLeftChild(index: number) {
    return Heap.leftChildIndex(index) < this.size;
  }

  private hasRightChild(index: number) {
    return Heap.rightChildIndex(index) < this.size;
  }

  private static leftChildIndex(parentIndex: number) {
    return parentIndex * 2 + 1;
  }

  private static rightChildIndex(parentIndex: number) {
    return parentIndex * 2 + 2;
  }

  private static parentIndex(childIndex: number) {
    return Math.floor((childIndex - 1) / 2);
  }
}

class QueueNode<T> {
  previous: QueueNode<T> | null;

  next: QueueNode<T> | null;

  readonly value: T;

  constructor(value: T) {
    this.value = value;
    this.previous = null;
    this.next = null;
  }
}

class Queue<T> {
  private head: QueueNode<T> | null;

  private tail: QueueNode<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  get isEmpty() {
    return this.head === null;
  }

  enqueue(element: T) {
    const newNode = new QueueNode(element);
    newNode.next = this.tail;
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.previous = newNode;
      this.tail = newNode;
    }
  }

  dequeue() {
    if (!this.head || !this.tail) {
      return null;
    }
    const node = this.head;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return node.value;
    }
    this.head = (node as QueueNode<T>).previous;
    (this.head as QueueNode<T>).next = null;
    return node.value;
  }
}

const rateLimit = <Fn extends (...args: any) => any>({ callsPerMinute = 60, fn } :
  { callsPerMinute: number, fn: Fn }) => {
  const queue = new Queue<() => void>();
  let idle = true;

  const dequeueAfterTimeout = () => {
    const functionQueued = queue.dequeue() as () => {};
    setTimeout(() => {
      functionQueued();
      if (queue.isEmpty) {
        idle = true;
      } else {
        dequeueAfterTimeout();
      }
    }, 60_000 / callsPerMinute);
  };

  return (...args: Parameters<typeof fn>) :
    Promise<ReturnType<typeof fn>> => new Promise((resolve) => {
    queue.enqueue(() => resolve(fn(...args)));

    if (idle) {
      idle = false;
      dequeueAfterTimeout();
    }
  });
};

const beginningOfYear = () => {
  const currentYear = (new Date()).getFullYear().toString();
  return new Date(currentYear);
};

export {
  fetchJson,
  groupBy,
  uniq,
  time,
  Heap,
  rateLimit,
  beginningOfYear,
  partition,
};
