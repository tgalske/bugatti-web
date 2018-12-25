import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import connect from "react-redux/es/connect/connect";

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expandedNav: false
    }
  }

  showNavbarItems() {
    return (
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {
            this.pages.map( (headerItem) =>
              <Link
                to={headerItem.route}
                onClick={() => this.setState({expandedNav: false })}
                className={this.headerItemStyles}
                key={headerItem.title}
              >
                {headerItem.title}
              </Link>
            )
          }
        </div>
      </div>
    )
  }

  appTitle = this.props.appConfigs.app_title;
  pages = this.props.appConfigs.pages;
  headerItemStyles = "block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white lg:mr-4 text-right text-lg";

  render() {
    return (
      <nav className="flex items-center justify-between flex-wrap bg-teal p-6">
        <div className="flex items-center flex-no-shrink text-white mr-6">
          <Link to="/" className="no-underline text-white font-semibold text-xl tracking-tight">
            {this.appTitle}
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"
            onClick={() => this.setState({expandedNav: !this.state.expandedNav} )}
          >
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
          </button>
        </div>

        <div className="hidden lg:block">
          {this.showNavbarItems()}
        </div>

        {
          this.state.expandedNav &&
          <div className="w-full block flex-grow lg:hidden">
            {this.showNavbarItems()}
          </div>
        }
      </nav>
    )
  }

}

const mapStateToProps = (state) => ({
  appConfigs: state.appConfigs
});

export default connect(mapStateToProps) (Header);