import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Option<T extends string> = {
  value: T;
  label: string;
};

type CustomSelectProps<T extends string> = {
  value: T;
  onChange: (val: T) => void;
  placeholder: string;
  options: Option<T>[];
  className?: string;
};

export function CustomSelect<T extends string>({
  value,
  onChange,
  placeholder,
  options,
  className = "w-[180px]",
}: CustomSelectProps<T>) {

  
  return (
    <Select value={value} onValueChange={(val) => onChange(val as T)}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
