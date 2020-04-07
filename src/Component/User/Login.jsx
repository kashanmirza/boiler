import React from 'react';
import TextFieldGroup from '../UI_Component/TextFieldGroup';
import { connect } from 'react-redux';
import { Authenticate } from '../../store/Actions/users';
import { alertActions } from '../../store/Actions/alerts';
import { bindActionCreators } from 'redux';
import history from '../../History';
import { Redirect } from 'react-router-dom';


class Login extends React.Component {
    constructor(props) {
        super(props);
        
        const { dispatch } = this.props;
        history.listen((location, action) => {
           this.props.onAlertClear()
        });
        console.log("==================",this.props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            isLoading: false,
            message: '',
            url: null
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {}, isLoading: true });
        //console.log(this.state);

        this.props.onAuthenticate(this.state)
        .then(
            (res) => {
                //debugger;
                console.log(res);
                this.setState({ url: '/Master' });
                history.push('/Master');
            }
        ).catch((e)=>{ console.log(e);})
        
    }
    handleKeyPress(event) {
        if (event.key == "Enter") {
            this.onSubmit();
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors, username, password, isLoading, message } = this.state;
        const { alert } = this.props;
        return (
            <div className="login_Main">
                <div className="login_Box clearfix">
                    <h1>Membership Management System !</h1>

                    <div className="col-md-12">
                        <div className="row">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        </div>
                    </div>

                    <form>
                        <div className="input-group login_Box_Input">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>

                            <input type="text" id="username" name="username"
                                className="form-control"
                                placeholder="USERNAME"
                                required=""
                                text={this.state.username}
                                onChange={this.onChange}
                                onKeyPress={this.handleKeyPress} />
                        </div>
                        <div className="input-group login_Box_Input">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>

                            <input type="PASSWORD" id="password" name="password"
                                className="form-control"
                                placeholder="PASSWORD"
                                required=""
                                text={this.state.password}
                                onChange={this.onChange}
                                onKeyPress={this.handleKeyPress} />
                        </div>
                        <button className="login_Box_Button"
                            disabled={isLoading} onClick={this.onSubmit}>LOGIN</button>

                    </form>
                    {this.state.url !== null ? <Redirect to="" /> : ""}
                </div>
                <p>2019 © Powered by Avanza Solutions Version 1.100.0</p>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (data) => dispatch(Authenticate(data)),
        // clear alert on location change
        onAlertClear : () =>      dispatch(alertActions.clear())
    };
};

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);