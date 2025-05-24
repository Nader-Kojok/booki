"use client";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faDownload, faShare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function ConfirmationPage({ searchParams }: PageProps) {
  const bookingId = searchParams?.bookingId as string | undefined;
  const paymentId = searchParams?.paymentId as string | undefined;

  // In a real app, we would fetch the booking details from the API
  const bookingDetails = {
    id: bookingId || "MOCK-BOOKING-123",
    paymentId: paymentId || "MOCK-PAYMENT-456",
    date: new Date().toLocaleDateString(),
    time: "14:00 - 15:00",
    sport: "Padel",
    court: "Court 1",
    price: "15,000 CFA",
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    console.log("Downloading booking confirmation...");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Booking Confirmation",
        text: `I've booked a ${bookingDetails.sport} court at ${bookingDetails.time} on ${bookingDetails.date}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-primary p-6 text-white text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="w-16 h-16 mx-auto mb-4"
              />
            </motion.div>
            <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
            <p className="mt-2">Your court is reserved and ready for you</p>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Booking Details */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-gray-600">Booking ID</dt>
                    <dd className="font-medium">{bookingDetails.id}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Payment ID</dt>
                    <dd className="font-medium">{bookingDetails.paymentId}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Date</dt>
                    <dd className="font-medium">{bookingDetails.date}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Time</dt>
                    <dd className="font-medium">{bookingDetails.time}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Sport</dt>
                    <dd className="font-medium">{bookingDetails.sport}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Court</dt>
                    <dd className="font-medium">{bookingDetails.court}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Price</dt>
                    <dd className="font-medium">{bookingDetails.price}</dd>
                  </div>
                </dl>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <QRCodeSVG
                    value={`${bookingDetails.id}|${bookingDetails.paymentId}`}
                    size={200}
                    level="H"
                    includeMargin
                  />
                </div>
                <p className="mt-4 text-sm text-gray-600 text-center">
                  Show this QR code at the venue
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faDownload} />
                Download Confirmation
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faShare} />
                Share
              </Button>
              <Link href="/bookings">
                <Button className="flex items-center gap-2">
                  View My Bookings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 