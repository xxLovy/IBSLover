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
import { addToilet, editToilet } from "@/redux/toilet/operations"
import { selectCurrentLocation } from "@/redux/pin/slice"
import { selectAddSuccess, selectEditSuccess, selectRemoveSuccess, selectSelectedToilets, selectToiletFromUser, selectVoteSuccess, setAddToastFalse, setEditToastFalse, setRemoveToastFalse, setVoteToastFalse } from "@/redux/toilet/slice"
import { useState, useEffect } from "react"
import VoteToilet from "./VoteToilet"
import { useToast } from "./ui/use-toast"
import { redirect } from "next/navigation"


const formSchema = z.object({
    name: z.string().min(2),
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

const SubmitToiletForm = ({ toiletId }: { toiletId?: string }) => {
    const [isVoting, setIsVoting] = useState(false);
    const toiletsToVote = useAppSelector(selectSelectedToilets);
    useEffect(() => {
        console.log(toiletsToVote)
        if (toiletsToVote.length > 0) {
            setIsVoting(true)
        } else {
            setIsVoting(false)
        }
    }, [toiletsToVote])
    const dispatch = useAppDispatch();
    const location = useAppSelector(selectCurrentLocation)
    const {
        user,
    } = useKindeBrowserClient();
    const toilets = useAppSelector(selectToiletFromUser)
    const toilet = toilets.filter(item => item._id === toiletId)[0]
    const addSuccess = useAppSelector(selectAddSuccess);
    const editSuccess = useAppSelector(selectEditSuccess);
    const voteSuccess = useAppSelector(selectVoteSuccess);
    const removeSuccess = useAppSelector(selectRemoveSuccess);
    const { toast } = useToast();

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
        dispatch(login({ kindeId: user?.id || '', username: user?.email || '' }))
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

        if (toilet) {
            dispatch(editToilet({ toilet: newToilet, userId: user?.id || '' }))
        } else {
            dispatch(addToilet({ toilet: newToilet, userId: user?.id || '' }))
        }

    }
    useEffect(() => {
        if (addSuccess) {
            dispatch(setAddToastFalse())
            toast({
                title: "Success",
                description: `You have successfully added a toilet`,
            });
            redirect("/")
        }
        if (editSuccess) {
            dispatch(setEditToastFalse())
            toast({
                title: "Success",
                description: `You have successfully edited a toilet`,
            });
            redirect("/")
        }
        if (voteSuccess) {
            dispatch(setVoteToastFalse())
            toast({
                title: "Success",
                description: `You have successfully voted a toilet`,
            });
            redirect("/")
        }
        if (removeSuccess) {
            dispatch(setRemoveToastFalse())
            toast({
                title: "Success",
                description: `You have successfully removed a toilet`,
            });
            redirect("/")
        }
    }, [addSuccess, editSuccess, voteSuccess, removeSuccess])

    return (
        <div className="flex justify-center items-center min-h-screen p-5">
            <div className="bg-white p-10 rounded-lg shadow-lg w-2/3">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-xl">Toilet Name</FormLabel>
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
                                    <FormLabel className="font-bold text-xl">Notes</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Put a note here" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </Form>
            </div>


            {
                isVoting &&
                <div className="">
                    <VoteToilet />
                    <h2 onClick={() => setIsVoting(false)}>Reset</h2>
                </div>
            }
        </div >

    )
}

export default SubmitToiletForm
