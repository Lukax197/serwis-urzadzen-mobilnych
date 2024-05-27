import styled from "styled-components";
import { Link as LinkR } from 'react-router-dom'

export const UserPanelContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 80px 20px 200px 20px;

    @media screen and (max-width: 552px) {
        margin-top: 40px;
        margin-bottom: 80px;
    }
`

export const UserPanelH1 = styled.h1`
    justify-content: center;
    text-align: center;
    font-weight: bold;
`

export const UserPanelRadioTileGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

export const UserPanelInputContainer = styled(LinkR)`
    position: relative;
    height: 15rem;
    width: 15rem;
    margin: 0.5rem;
    background-color: #01BF71;
    border-radius: 8px;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`

export const UserPanelInput = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    margin: 0;
    cursor: pointer;
    z-index: 2;
    opacity: 0;
`

export const UserPanelInputTile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    border: 2px solid #01BF71;
    border-radius: 8px;
    transition: all 300ms ease;
`

export const UserPanelInputTileLabel = styled.label`
    color: #000;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
`

export const UserPanelMainContainer = styled.div`
    width: 100%;
`