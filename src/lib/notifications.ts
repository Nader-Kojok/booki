interface NotificationData {
  type: "email" | "sms";
  recipient: string;
  subject?: string;
  message: string;
  bookingDetails?: {
    id: string;
    date: string;
    time: string;
    sport: string;
    court: string;
    price: string;
  };
}

export async function sendNotification(data: NotificationData): Promise<boolean> {
  try {
    // In a real app, this would integrate with an email/SMS service
    // For now, we'll just simulate the API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (data.type === "email") {
      console.log("Sending email notification:", {
        to: data.recipient,
        subject: data.subject,
        message: data.message,
        bookingDetails: data.bookingDetails,
      });
    } else {
      console.log("Sending SMS notification:", {
        to: data.recipient,
        message: data.message,
        bookingDetails: data.bookingDetails,
      });
    }

    return true;
  } catch (error) {
    console.error("Failed to send notification:", error);
    return false;
  }
}

export function generateBookingConfirmationMessage(
  bookingDetails: NotificationData["bookingDetails"]
): string {
  if (!bookingDetails) return "";

  return `
Booking Confirmation

Your booking has been confirmed!

Details:
- Booking ID: ${bookingDetails.id}
- Date: ${bookingDetails.date}
- Time: ${bookingDetails.time}
- Sport: ${bookingDetails.sport}
- Court: ${bookingDetails.court}
- Price: ${bookingDetails.price}

Please show your QR code at the venue.
Thank you for choosing Booki!
  `.trim();
}

export function generateBookingReminderMessage(
  bookingDetails: NotificationData["bookingDetails"]
): string {
  if (!bookingDetails) return "";

  return `
Booking Reminder

Your booking is coming up!

Details:
- Date: ${bookingDetails.date}
- Time: ${bookingDetails.time}
- Sport: ${bookingDetails.sport}
- Court: ${bookingDetails.court}

Don't forget to bring your QR code.
See you soon!
  `.trim();
} 