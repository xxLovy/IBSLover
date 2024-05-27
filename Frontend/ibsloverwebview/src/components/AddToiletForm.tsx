"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form"
import { checkboxItems } from "../../constants"
import RadioGroupField from "./FormRadioGroup"
import { Input } from "./ui/input"

const formSchema = z.object({
    name: z.string(),
    women: z.string(),
    men: z.string(),
    accessible: z.string(),
    children: z.string(),
    genderNeutral: z.string(),
    free: z.string(),
    price: z.string().optional(),
    notes: z.string().optional()
})

type TFormSchema = z.infer<typeof formSchema>

const AddToiletForm = () => {
    const form = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            women: "dontknow",
            men: "dontknow",
            accessible: "dontknow",
            children: "dontknow",
            genderNeutral: "dontknow",
            free: "dontknow"
        }
    })

    function onSubmit(values: TFormSchema) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Toilet Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Put a toilet name or street name here" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {checkboxItems.map(item => (
                    item.key !== "free" && (
                        <RadioGroupField
                            key={item.key}
                            name={item.key as any}
                            label={item.label}
                            control={form.control}
                        />
                    )
                ))}
                <RadioGroupField
                    name="free"
                    label="Free"
                    control={form.control}
                    showInputOnYes={true}
                    inputLabel="Price"
                />

                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Put a note here" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default AddToiletForm
