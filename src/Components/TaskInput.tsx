type TaskInputProps = {
    text: string;
    setText: (text: string) => void;
}

export const TaskInput = ({ text, setText }: TaskInputProps) => (
    <input
        type="text"
        value={text}
        onChange={ (e) => setText(e.target.value)}
    />
)

export default TaskInput;