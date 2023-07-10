import { useAppDispatch } from "@/shared/store";
import { ModalWrapper } from "../../../ModalWrapper";
import { handleOpenLoginModal } from "@/shared/store/slices/modal/modalSlice";
import { useSelector } from "react-redux";
import { selectIsOpenLoginModal } from "@/shared/store/slices/modal/selectors";
import FooterContent from "../FooterContent";
import { Input } from "@/components/ui/Input";
import BodyContent from "../BodyContent";
const LoginModal = () => {
  const isOpen = useSelector(selectIsOpenLoginModal);

  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(handleOpenLoginModal(false));
  };

  const body = <BodyContent />;
  const footer = <FooterContent />;

  return (
    <ModalWrapper
      body={body}
      footer={footer}
      onClose={onClose}
      isOpen={isOpen}
      title="Войдите"
    />
  );
};

export default LoginModal;
