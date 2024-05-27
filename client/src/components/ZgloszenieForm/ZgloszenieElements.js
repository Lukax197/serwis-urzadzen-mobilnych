import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Select from 'react-select';

export const Container = styled.div`
    height: auto;
    min-height: 692px;
    margin: 100px 20px 100px 20px;
    // position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 0;
    overflow: hidden;
`

export const FormWrap = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 400px) {
        height: 80%;
    }
`

export const Icon = styled(Link)`
    margin-left: 32px;
    display: flex;
    margin-top: 32px;
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    font-size: 32px;
    width: 20%;

    @media screen and (max-width: 480px) {
        margin-left: 16px;
        margin-top: 8px;
    }
`

export const FormContent = styled.div`
    height: 100%;
    display: flex
    flex-direction: column;
    justify-content: center;
    margin-top: 5%;
    margin: 5px;

    @media screen and (max-width: 480px) {
        padding: 10px;
    }
`

export const Form = styled.form`
    background: #010101;
    max-width: 800px;
    height: auto;
    width: 100%;
    z-index: 1;
    display: grid;
    margin: 0 auto;
    padding: 80px 32px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
    margin-top: 5%;

    @media screen and (max-width: 400px) {
        padding: 32px 32px;
    }
`

export const FormH1 = styled.h1`
    margin-bottom: 40px;
    color: #fff;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
`

export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: #fff;
`

export const AttentionText = styled.label`
    margin-bottom: 20px;
    margin-top: -16px;
    font-size: 14px;
    color: orange;
    text-align: center;
`

export const FormInput = styled.input`
    padding: 1vh 1vh;
    margin-bottom: 32px;
    border: none;
    border-radius: 4px;
`

export const FormTextarea = styled.textarea`
    padding: 1vh 1vh;
    margin-bottom: 32px;
    border: none;
    border-radius: 4px;
    resize: none;
`

export const FormLogin = styled.form`
    max-width: 500px;
    height: auto;
    width: 100%;
    z-index: 1;
    display: grid;
    margin: 0 auto;
    padding: 3vh 2vh;
    border-radius: 4px;
`

export const FormH1Login = styled.h1`
    margin-bottom: 2vh;
    color: #fff;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
`

export const FormLabelLogin = styled.label`
    margin-bottom: 1vh;
    font-size: 14px;
    color: #fff;
`

export const FormInputLogin = styled.input`
    padding: 16px 16px;
    margin-bottom: 2vh;
    border: none;
    border-radius: 4px;
`

export const FormButtonLogin = styled.button`
    background: #01bf71;
    padding: 16px 0;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin-top: 8vh;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`

export const FormContentLogin = styled.div`
    height: 100%;
    display: flex
    flex-direction: column;
    justify-content: center;
    margin-top: 5vh;
`

export const FormButton = styled.button`
    background: #01bf71;
    padding: 16px 0;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin-top: 60px;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`

export const Text = styled.span`
    text-align: center;
    margin-top: 24px;
    color: #fff;
    font-size: 14px;
`

export const TitleIcon = styled.div`
    margin-right: 0.5rem;
    font-size: 3.5rem;
    margin-bottom: 0.5rem;
    margin-left: -1.4rem;
    margin-top: -1.6rem;
`

export const LinkedText = styled(Link)``

export const FormSelect = styled(Select)`
    margin-bottom: 32px;
`

export const DialogWindow = styled.div `
    background-color: white;
    height: 70vh;
    width: 70vw;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 8px solid #01bf71;
    border-radius: 20px;
    opacity: ${({opacity}) => (opacity === 1 ? '1' : '0')};
    display: ${({display}) => (display === 1 ? 'block' : 'none')};
    transition: opacity 0.3s linear;
    background: #242323;

    @media screen and (max-width: 440px) {
        width: 85vw;
    }

    @media screen and (max-height: 670px) {
        height: 74vh;
    }

    @media screen and (min-height: 1050px) {
        height: 55vh;
    }

    overflow-y: ${({showOverflowY}) => (showOverflowY === true ? 'scroll' : 'unset')};
`

export const SectionTitle = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    font-weight: bold;
`

export const DaneOsobowe = styled.div`
    display: ${({display}) => (display === true ? 'grid' : 'none')};
`

export const CheckboxItem = styled.div`
    display: flex;
    margin-top: 10px;

    ${FormInput} {
        width: 15px;
        height: 15px;
        margin-right: 10px;
        margin-top: 3px;
        position: absolute;
    }

    ${FormLabel} {
        margin-left: 25px;
    }
`