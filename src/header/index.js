import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import connect from "react-redux/es/connect/connect";

class Header extends Component {

  appTitle = this.props.appConfigs.app_title;
  pages = this.props.appConfigs.pages;
  headerItemStyles = "block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4";

  render() {
    return (
      <nav className="flex items-center justify-between flex-wrap bg-teal p-6">
        <div className="flex items-center flex-no-shrink text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">{this.appTitle}</span>
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            {
              this.pages.map( (headerItem) =>
                <Link to={headerItem.route} className={this.headerItemStyles} key={headerItem.title}>
                  {headerItem.title}
                </Link>
              )
            }
          </div>
          <div>
            <p
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0">Download</p>
          </div>
        </div>
      </nav>
    )
  }

}

const mapStateToProps = (state) => ({
  appConfigs: state.appConfigs
});

export default connect(mapStateToProps) (Header);