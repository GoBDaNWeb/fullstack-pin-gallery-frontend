import { useSelector } from "react-redux";
import { ModalWrapper } from "../../../ModalWrapper";
import BodyContent from "../BodyContent";
import FooterContent from "../FooterContent";
import { selectIsOpenRegisterModal } from "@/shared/store/slices/modal/selectors";
import { useAppDispatch } from "@/shared/store";
import { handleOpenRegisterModal } from "@/shared/store/slices/modal/modalSlice";

const RegisterModal = () => {
  const isOpen = useSelector(selectIsOpenRegisterModal);

  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(handleOpenRegisterModal(false));
  };

  const body = <BodyContent />;
  const footer = <FooterContent />;

  return (
    <ModalWrapper
      body={body}
      footer={footer}
      onClose={onClose}
      isOpen={isOpen}
      title="Зарегестрируйтесь"
    />
  );
};

export default RegisterModal;
