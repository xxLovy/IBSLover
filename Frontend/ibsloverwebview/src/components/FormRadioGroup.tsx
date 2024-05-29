import { Controller, Control } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"; // Ensure you have an Input component

interface RadioGroupFieldProps {
    name: string;
    label: string;
    control: Control<any>;
    showInputOnYes?: boolean;
    inputLabel?: string;
}

const RadioGroupField: React.FC<RadioGroupFieldProps> = ({ name, label, control, showInputOnYes, inputLabel }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Controller
                            name={name}
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="flex flex-row"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id={`${name}-yes`} />
                                        <Label htmlFor={`${name}-yes`}>yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id={`${name}-no`} />
                                        <Label htmlFor={`${name}-no`}>no</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="dontknow" id={`${name}-dontknow`} />
                                        <Label htmlFor={`${name}-dontknow`}>dont know</Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                    <FormMessage />
                    {showInputOnYes && field.value === 'no' && (
                        <FormField
                            control={control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{inputLabel}</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter price" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                </FormItem>
            )}
        />
    );
};

export default RadioGroupField;
