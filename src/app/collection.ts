export class Collection<T> {

  private items: T[] = [];

  constructor(items: T[]) {
    this.items = items;
  }

  getAllItems(): T[] {
    return this.items;
  }

  getItem(value: string | number): T | undefined {
    return this.items.find(item => item === value);
  }

  clearAllItems(): void {
    this.items = [];
  }

  deleteItem(value: number | string): void {
    let result = this.items.filter(item => item !== value);
    this.items = result;
  }

  replaceItem(replaceIndex: number, deleteValue: number, setValue: T): T[] {
    return this.items.splice(replaceIndex, deleteValue, setValue);
  }
  
}

export const stringCollection: Collection<string> = new Collection<string>(['Яблоко', 'Апельсин', 'Виноград']);
export const numberCollection: Collection<number> = new Collection<number>([1, 2, 3, 4, 5]);