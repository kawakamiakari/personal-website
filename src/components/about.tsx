import { graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React, { Component } from 'react';

import { throttle } from 'throttle-debounce';

import AboutStyles from '../styles/about.module.scss';

import PageTitle from '../components/pagetitle';

const Image = () => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "profile.png" }) {
          childImageSharp {
            fluid(maxWidth: 160) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => <Img fluid={data.placeholderImage.childImageSharp.fluid} />}
  />
);

class AboutPage extends Component {
  public componentDidMount() {
    window.addEventListener(
      'scroll',
      throttle(100, () => {
        this.updatePerspective();
      }),
      false
    );
  }

  public render() {
    return (
      <div id="about" className={`page ${AboutStyles.page}`}>
        <PageTitle title="ワタシについて" />
        <div className={AboutStyles.contents}>
          <div className={`${AboutStyles.photo} ${AboutStyles.parallax}`}>
            <div
              className={`${AboutStyles.square} ${AboutStyles.parallax_forward}`}
            />
            <div
              className={`${AboutStyles.circle} ${AboutStyles.parallax_front}`}
            >
              <Image />
            </div>
          </div>
          <div className={AboutStyles.description}>
            <p className={AboutStyles.name}>川上 明里</p>
            <p>
              1993年広島生まれ、神奈川在住。
              <br />
              工学部情報系学科卒。
              <br />
              好き) ねこ/旅行/ゲーム/焼肉/炭酸/絵を描くこと
            </p>
            <p>
              ソフトウェアを通じて
              <br />
              <b>体験を売る仕事がしたい</b>と思っています。
            </p>
          </div>
        </div>
      </div>
    );
  }

  private updatePerspective() {
    const element: HTMLElement = document.querySelector(
      `.${AboutStyles.parallax}`
    );
    const clientRectTop = element.getBoundingClientRect().top;
    const innerHeight = window.innerHeight;

    const perspectiveY =
      ((innerHeight / 2 - clientRectTop) / element.clientHeight) * 100;
    element.style.perspectiveOrigin = `0% ${perspectiveY}%`;
  }
}

export default AboutPage;
