import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const paymentSchema = z.object({
  paymentMethod: z.enum(["orange_money", "wave", "card"]),
  phoneNumber: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCVC: z.string().optional(),
}).refine((data) => {
  if (data.paymentMethod === "orange_money" || data.paymentMethod === "wave") {
    return !!data.phoneNumber;
  }
  return !!data.cardNumber && !!data.cardExpiry && !!data.cardCVC;
}, {
  message: "Please fill in all required fields for your selected payment method",
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
}

export function PaymentForm({ amount, onSuccess, onError }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "orange_money",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  const handleSubmit = async () => {
    try {
      setIsProcessing(true);
      
      // Simulate API call to payment provider
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Generate a mock payment ID
      const paymentId = `PAY-${Math.random().toString(36).substr(2, 9)}`;
      
      onSuccess(paymentId);
    } catch (error) {
      onError(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
        <p className="text-gray-600">Amount to pay: {amount} CFA</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3 gap-4"
                  >
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem
                          value="orange_money"
                          className="peer sr-only"
                        />
                      </FormControl>
                      <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        <FontAwesomeIcon icon={faMobile} className="h-6 w-6 mb-2" />
                        <span>Orange Money</span>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem
                          value="wave"
                          className="peer sr-only"
                        />
                      </FormControl>
                      <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        <FontAwesomeIcon icon={faMobile} className="h-6 w-6 mb-2" />
                        <span>Wave</span>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem
                          value="card"
                          className="peer sr-only"
                        />
                      </FormControl>
                      <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        <FontAwesomeIcon icon={faCreditCard} className="h-6 w-6 mb-2" />
                        <span>Card</span>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {(paymentMethod === "orange_money" || paymentMethod === "wave") && (
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your phone number"
                      {...field}
                      type="tel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {paymentMethod === "card" && (
            <>
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cardExpiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="MM/YY"
                          {...field}
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardCVC"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVC</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123"
                          {...field}
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
} 