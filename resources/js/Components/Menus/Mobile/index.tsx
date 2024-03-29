import { MdAssignment, MdLabel, MdOutlineAddCircle, MdPerson2 } from "react-icons/md";
import { FaBars, FaShoppingBasket } from 'react-icons/fa';
import { useTranslation } from "react-i18next";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import '@/i18n';
import { LogoL, Logout, LogoW, MenuButton, ProfileImage, ProfileImageContainer, ProfileImageContainerMobile } from '../style';
import { MenuMobile, MobileIcon, MobileLinks } from './style';
import { DropdownContent } from '@/Base/style';
import { MenuProps } from '../types';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from "react";
import { LanguageModal } from "@/Components/LanguageModal";
import { LanguageModalTrigger } from "@/Components/LanguageModalTrigger";

export function MenuMobileComponent({ user, logout}: MenuProps) {
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState(false);

  function closeModal() {
    setOpenModal(false);
  }

  return (
    <Dialog.Root open={openModal}>
      <MenuMobile>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <ProfileImageContainerMobile>
            <ProfileImage src={user?.profile_picture ? user.profile_picture : 'https://i.pinimg.com/736x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg'} />
          </ProfileImageContainerMobile>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownContent side="bottom" align="center" items="start">
            { 
              user ?
              <>
              <MobileLinks href='/profile'><MobileIcon direction='left' ><MdPerson2 /> {t('labels:profile')}</MobileIcon></MobileLinks>
              <MobileLinks onClick={() => logout()}><MobileIcon direction='left'><Logout /> {t('labels:logout')}</MobileIcon></MobileLinks>
              </>
            :
              <>
                <MobileLinks href='/register'><MobileIcon direction='left' ><MdAssignment /> {t('inputs:create-account')}</MobileIcon></MobileLinks>
                <MobileLinks href='/login'><MobileIcon direction='left' ><MdPerson2 /> {t('inputs:login')}</MobileIcon></MobileLinks>
              </>
            }
            <LanguageModalTrigger setOpenModal={setOpenModal} />
          </DropdownContent>
      </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <MobileLinks href='/wishes'><LogoW>W<LogoL>L</LogoL></LogoW></MobileLinks>
      <DropdownMenu.Root>
        <MenuButton><FaBars/></MenuButton>
        <DropdownMenu.Portal>
          <DropdownContent side="bottom" align="center" items="end">
            <MobileLinks href='/wishes'><MobileIcon direction='right'>{t('labels:my-list')} <FaShoppingBasket /></MobileIcon></MobileLinks>
            <MobileLinks href='/categories'><MobileIcon direction='right'>{t('labels:categories')} <MdLabel /></MobileIcon></MobileLinks>
            <MobileLinks href='/create-product'><MobileIcon direction='right'>{t('labels:create-product')} <MdOutlineAddCircle /></MobileIcon></MobileLinks>
          </DropdownContent>
      </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </MenuMobile>
    <LanguageModal closeModal={closeModal} />
  </Dialog.Root>
  )
}