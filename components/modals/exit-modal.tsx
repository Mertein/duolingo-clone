"use client";
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useExitModal } from "@/store/use-exit-modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const ExitModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useExitModal();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      {/* <DialogTrigger asChild>
        <Button variant="ghost" size="lg">
          Open
        </Button>
      </DialogTrigger> */}
      <DialogContent className="max-w-md ">
        <DialogHeader>
          <div className="flex items-center justify-center w-full mb-5">
            <Image src="/mascot_sad.jpg" alt="Mascot" height={80} width={80} />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Wait, don&apos;t go!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You&apos;re about to leave the lesson. Are your sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="w-full flex flex-col gap-y-4">
            <Button
              onClick={close}
              variant="primary"
              size="lg"
              className="w-full "
            >
              Keep learnin
            </Button>
            <Button
              onClick={() => {
                close();
                router.push("/learn");
              }}
              variant="dangerOutline"
              size="lg"
              className="w-full "
            >
              End sesion
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExitModal;
