import type { FC, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;
interface Props extends InputProps {
  label?: string;
  placeholder?: string;
  id: string;
  type?: string;
}

export const Input: FC<Props> = ({
  label,
  placeholder,
  id,
  type,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        {...props}
      ></input>
    </div>
  );
};
