import React from 'react'
import { GrNotification } from 'react-icons/gr'
import { AiOutlineUser, AiOutlineHome } from 'react-icons/ai'
import { GiAutoRepair } from 'react-icons/gi'
import {MdOutlineLocalPostOffice} from 'react-icons/md'
import {FiUsers} from 'react-icons/fi'
import {
    UserPanelContainer,
    UserPanelRadioTileGroup,
    UserPanelInputContainer,
    UserPanelInput,
    UserPanelInputTile,
    UserPanelInputTileLabel,
    UserPanelH1,
    UserPanelMainContainer
} from './UserPanelElements'

const UserPanel = () => {
  return (
    <>
    <UserPanelMainContainer>
        <UserPanelH1> Panel użytkownika </UserPanelH1>
        <UserPanelContainer>
            <UserPanelRadioTileGroup>
                <UserPanelInputContainer to="dane-konta">
                    <UserPanelInput id="dane_konta"/>
                    <UserPanelInputTile>
                        <AiOutlineUser className='ikona'/>
                        <UserPanelInputTileLabel htmlFor="dane_konta"> Dane konta </UserPanelInputTileLabel>
                    </UserPanelInputTile>
                </UserPanelInputContainer>
                <UserPanelInputContainer to="zamowienia">
                    <UserPanelInput id="zamowienia"/>
                    <UserPanelInputTile>
                        <GiAutoRepair className='ikona'/>
                        <UserPanelInputTileLabel htmlFor="zamowienia"> Zamówienia </UserPanelInputTileLabel>
                    </UserPanelInputTile>
                </UserPanelInputContainer>
                <UserPanelInputContainer to="powiadomienia">
                    <UserPanelInput id="powiadomienia"/>
                    <UserPanelInputTile>
                        <GrNotification className='ikona'/>
                        <UserPanelInputTileLabel htmlFor="powiadomienia"> Powiadomienia </UserPanelInputTileLabel>
                    </UserPanelInputTile>
                </UserPanelInputContainer>
                <UserPanelInputContainer to="wiadomosci">
                    <UserPanelInput id="wiadomosci"/>
                    <UserPanelInputTile>
                        <MdOutlineLocalPostOffice className='ikona'/>
                        <UserPanelInputTileLabel htmlFor="wiadomosci"> Wiadomości </UserPanelInputTileLabel>
                    </UserPanelInputTile>
                </UserPanelInputContainer>
            </UserPanelRadioTileGroup>
        </UserPanelContainer>
        </UserPanelMainContainer>
    </>
  )
}

export default UserPanel