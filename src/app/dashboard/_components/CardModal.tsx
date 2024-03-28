import React, { useRef } from "react";

const CardModal = ({ show }: { show: boolean }) => {
  const formRef = useRef<HTMLDivElement>(null);
  show
    ? formRef.current?.classList.remove("hidden")
    : formRef.current?.classList.add("hidden");
  return (
    <div ref={formRef} className="hidden">
      CardModal
    </div>
  );
};

export default CardModal;
