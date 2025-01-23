export interface Label {
    id: string;
    name: string;
  }
  
  export interface Card {
    id: string;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    assignee: string;
    labels: Label[];
    columnId: string;
  }
  
  export interface Column {
    id: string;
    title: string;
    cardIds: string[];
  }
  
  export interface Board {
    id?: string;
    title?: string;
    columns?: Column[];
  }