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
    FormMessage,
} from "@/components/ui/form"
import { checkboxItems } from "../../constants"
import RadioGroupField from "./FormRadioGroup"
import { Input } from "./ui/input"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { login } from "@/redux/user/operations"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { addToilet } from "@/redux/toilet/operations"
import { selectCurrentLocation } from "@/redux/pin/slice"

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

export type TFormSchema = z.infer<typeof formSchema>

const SubmitToiletForm = ({ toilet }: { toilet?: Toilet }) => {
    const dispatch = useAppDispatch();
    const location = useAppSelector(selectCurrentLocation)
    const {
        user,
    } = useKindeBrowserClient();
    let defaultForm: TFormSchema | undefined = toilet ?
        {
            name: toilet.name,
            women: toilet.features!.women,
            men: toilet.features!.men,
            accessible: toilet.features!.accessible,
            children: toilet.features!.children,
            genderNeutral: toilet.features!.genderNeutral,
            free: toilet.features!.free,
            price: toilet?.price,
            notes: toilet.description,
        } : undefined

    const form = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultForm || {
            name: "",
            women: "dontknow",
            men: "dontknow",
            accessible: "dontknow",
            children: "dontknow",
            genderNeutral: "dontknow",
            free: "dontknow",
            price: "",
            notes: ""
        }
    })

    function onSubmit(values: TFormSchema) {
        console.log("dispatching")
        dispatch(login({ kindeId: user?.id || '', username: user?.email || '' }))
        console.log("ok")
        let newToilet: Toilet;
        if (toilet) {
            newToilet = {
                ...toilet,
                name: values.name,
                description: values.notes,
                lastUpdateTime: String(new Date()),
                features: {
                    children: values.children as threeCases,
                    //women, men, accessible, genderNeutral, free
                    women: values.women as threeCases,
                    accessible: values.accessible as threeCases,
                    genderNeutral: values.genderNeutral as threeCases,
                    free: values.free as threeCases,
                    men: values.men as threeCases
                },
                price: values.price,
            }
        } else {
            newToilet = {
                name: values.name,
                description: values.notes,
                lastUpdateTime: String(new Date()),
                features: {
                    children: values.children as threeCases,
                    //women, men, accessible, genderNeutral, free
                    women: values.women as threeCases,
                    accessible: values.accessible as threeCases,
                    genderNeutral: values.genderNeutral as threeCases,
                    free: values.free as threeCases,
                    men: values.men as threeCases
                },
                price: values.price,
                isFromUser: true,
                isRemoved: false,
                votesCount: 0,
                location: {
                    type: "Point",
                    coordinates: [location.longitude, location.latitude]
                }
            }
        }

        dispatch(addToilet({ toilet: newToilet, userId: user?.id || '' }))
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

export default SubmitToiletForm
