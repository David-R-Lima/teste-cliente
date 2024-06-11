export interface BodyProps {
    properties: {
        name: string;
        description: string;
        type: string;
        required: boolean;
        additionalProperties?: {
            name: string;
            type: string;
            description: string;
            required: boolean;
            additionalProperties?: {
                name: string;
                type: string;
                description: string;
                required: boolean;
            }[];
        }[];
    }[]
  }