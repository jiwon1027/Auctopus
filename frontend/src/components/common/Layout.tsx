import React, { ReactNode } from "react";
import Container from "@mui/material/Container";
import { styled as mstyled } from "@mui/system";
import Header from "@components/common/Header";

interface IProps {
  title?: string;
  back?: boolean;
  right?: JSX.Element;
  children: ReactNode;
}

/**
 * Layout component는 헤더 및 theme을 포함하고 있다. 화면 비율에 맞춰 component를 넣으면 된다
 * @param [props.right] 오른쪽 헤더에 들어갈 아이콘 버튼
 * @param props.children layout 안에 들어갈 하위 Child components
 * @returns Layout component
 *
 * @example
 * 화면 비율 조정하는 법
 * ```ts
 * // 컴포넌트 비율은 1:2 이며 오른쪽 헤더 아이콘 등록
 * const RightComponent = <button>click</button>
 * <Layout right={RightComponent}>
 *   <div style={{ flex: 1}}></div>
 *   <div style={{ flex: 2}}></div>
 * </Layout>
 *
 * // 오른쪽 헤더 아이콘 없을시
 * <Layout>
 *   <div style={{ flex: 1}}></div>
 *   <div style={{ flex: 2}}></div>
 * </Layout>
 *
 * ```
 */
export default function Layout(props: IProps) {
  return (
    <StyledContainer maxWidth="md">
      <Header title={props.title} back={props.back} right={props.right} />
      {props.children}
    </StyledContainer>
  );
}

const StyledContainer = mstyled(Container)`
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 0 1.8rem;
`;
