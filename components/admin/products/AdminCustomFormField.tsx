import { Control, FieldPath, FieldValues, ControllerRenderProps } from "react-hook-form";
import { FormControl, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { TFunction } from 'i18next';

interface AdminCustomFormFieldProps<T extends FieldValues = FieldValues> {
    readonly control: Control<T>;
    readonly name: string;
    readonly label: string;
    readonly type?: string;
    readonly placeholder?: string;
    readonly step?: string | number;
    readonly min?: string | number;
    readonly max?: string | number;
    readonly t?: TFunction;
}

function AdminCustomFormField<T extends FieldValues = FieldValues>({
    control,
    name,
    label,
    type = 'text',
    placeholder,
    step,
    min,
    max,
    t,
}: AdminCustomFormFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name as FieldPath<T>}
            render={({ field }: { field: ControllerRenderProps<T, FieldPath<T>> }) => (
                <FormItem>
                    <FormLabel className="text-base font-medium">{label}</FormLabel>
                    <FormControl>
                        {type === 'textarea' ? (
                            <Textarea {...field} placeholder={placeholder ?? label} rows={4} className="w-full h-[120px] rounded text-base resize-none bg-neutral-100 px-4 py-[13px] border-none" />
                        ) : (
                            <Input
                                {...field}
                                type={type}
                                placeholder={placeholder ?? label}
                                step={step}
                                min={min}
                                max={max}
                                className="rounded text-base bg-neutral-100 px-4 py-[13px] border-none"
                            />
                        )}
                    </FormControl>
                    <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
            )}
        />
    );
}

export default AdminCustomFormField;