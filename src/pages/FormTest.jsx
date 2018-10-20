import React from "react";
import { Row, Col } from "react-bootstrap";
import "../styles/Test.css";

export default function FormTest() {
    return (
        <main>
            <div className='container' id='testContainer'>
                <div className="row">
                <div className="col col-sm-4 sd-4">
                <div id='sidebar'>
                    <span id='formTitle'>RED Presentation Evaluation</span><br /><br />
                    <span id='formMsg'>Thank you for allowing RED into your classroom.
                        RED strives to provide an understanding of drug use
                        through biological mechanisms. We are constantly
                        working to improve our presentations. The information
                        you provide below is valuable to us, please be as
                        detailed as possible. Thank you in advance.</span>
                </div>
                </div>
                <div className="col col-sm-8 sd-8" id="formSection">
                    {/* A little help for the Netlify post-processing bots */}
                    <form name="PresSignUp" method="POST">
                      <input type="hidden" name="form-name" value="PresSignUp" />
                      <p>
                        <label>Email address: <input type="email" name="email"/></label>
                      </p>
                      <p>
                        <label>School Name/Group Name: <input type="text" name="groupName"/></label>
                      </p>
                      <p>
                        <button type="submit">Submit</button>
                      </p>
                    </form>
                </div>
                </div>
            </div>
        </main>
    );
}
