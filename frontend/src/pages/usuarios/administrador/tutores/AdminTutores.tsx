import BtnRegistrar from "./components/BtnRegistrar";
import TablaTutores from "./components/TablaTutores";
import ModalRegistrarForm from "./components/ModalRegistrarForm";
import React from "react";

export default function AdminTutores() {
  const [stateModal, setStateModal] = React.useState(false);

  return (
    <>
      <BtnRegistrar setStateModal={setStateModal}/>
      <ModalRegistrarForm state={stateModal} setStateModal={setStateModal} />
      <TablaTutores />
    </>
  );
}
