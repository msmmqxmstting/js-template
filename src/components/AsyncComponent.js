import Loading from 'components/Common/Loading/Loading';
/**
 * Created By xun  on 2018-11-29 14:30.
 * Description: AsyncComponent
 */
import React, { Component } from 'react';

const AsyncComponent = (importComponent) => {
	return class extends Component {
		constructor(props) {
			super(props);

			this.state = {
				component: null
			};
		}

		componentDidMount() {
			importComponent().then((cmp) => {
				this.setState({ component: cmp.default });
			});
		}

		render() {
			const C = this.state.component;

			return C ? (
				<C {...this.props} />
			) : (
				<div style={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
					<Loading />
				</div>
			);
		}
	};
};
export default AsyncComponent;
