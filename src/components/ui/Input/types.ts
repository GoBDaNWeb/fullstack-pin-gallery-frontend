export interface IInputProps {
    func: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    placeholder: string;
    name: string;
    value?: string;
    error?: boolean;
}
