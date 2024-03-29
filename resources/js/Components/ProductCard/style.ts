import styled, { css } from "styled-components";

export const Card = styled.div`
  ${({ theme }) => css`
    width: 18.625rem;
    height: 26.5rem;
    border-radius: 30px;
    background: ${theme.grey[500]};
    display: flex;
    padding: 10px;
    flex-direction: column;
    gap: .2rem;
    margin-bottom: 2rem;
    position: relative;

    /* &:hover ${EditMenu} {
      display: block;
    } */

    @media (max-width: 600px) {
      width: 100%;
      height: 23rem;
    }
  `}

`;

export const CardInList = styled.div`
  margin: 0 auto;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  ${({ theme }) => css`
    border-radius: 15px;
  `}
`;

export const Image = styled.img`
  ${({ theme }) => css`
    background: ${theme.grey[400]};
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 30px;
  `}
`;

export const Info = styled.div`
  ${({ theme }) => css`
    text-align: left;
    color: ${theme.white[100]};
  `}
`;

export const Title = styled.h3`
  ${({ theme }) => css`
    color: ${theme.white[100]};
    font-weight: 600;
    font-size: 1.33rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: 1024px) {
      font-size: 1rem;
    }
  `}
`;

export const Price = styled.h4`
  ${({ theme }) => css`
    color: ${theme.white[100]};
    font-weight: normal;
    font-size: 1.16rem;
    @media (max-width: 1024px) {
      font-size: 1rem;
    }
  `}
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const EditMenu = styled.div`
  ${({ theme }) => css`
    display: block;
    position: absolute;
    color: ${theme.white[100]};
    font-size: 2rem;
    right: 0;
    padding-inline: 0.9rem;
    top: 5%;
    svg {
      stroke: ${theme.grey[500]};
      stroke-width: .8;
    }
  `}

  &:focus {
    display: block;
  }
`;