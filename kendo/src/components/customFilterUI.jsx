import React from 'react';

export class CustomFilterUI extends React.Component {
    onChange = (event) => {
        const value = event.target.value === 'null' ? null : event.target.value === 'true';
        const { firstFilterProps } = this.props;

        firstFilterProps.onChange({
            value,
            operator: 'eq',
            syntheticEvent: event.syntheticEvent
        });
    }

    render() {
        const { firstFilterProps } = this.props;
        const value = firstFilterProps.value;

        return (
            <div>
                <input
                    name="contains"
                    type="radio"
                    value="contains"
                    checked={value === true}
                    onChange={this.onChange}
                />
                <label htmlFor="bool-null">&nbsp;contains</label>
                <br />
                <input
                    name="not contains"
                    type="radio"
                    value="not contains"
                    checked={value === true}
                    onChange={this.onChange}
                />
                <label htmlFor="bool-true">&nbsp;not contains</label>
                <br />
                <input
                    name="equal"
                    type="radio"
                    value="equal"
                    checked={value === true}
                    onChange={this.onChange}
                />
                <label htmlFor="bool-false">&nbsp;equal</label>                
                <br/>
                <input
                    name="not equal"
                    type="radio"
                    value="not equal"
                    checked={value === true}
                    onChange={this.onChange}
                />
                <label htmlFor="bool-false">&nbsp;start with</label>
                <br/>
                <input
                    name="end with"
                    type="radio"
                    value="end with"
                    checked={value === true}
                    onChange={this.onChange}
                />
                <label htmlFor="bool-false">&nbsp;end with</label>
                <br/>
                <input
                    name="null"
                    type="radio"
                    value="null"
                    checked={value === true}
                    onChange={this.onChange}
                />
                <label htmlFor="bool-false">&nbsp;null</label>
                <br/>
                <input
                    name="not null"
                    type="radio"
                    value="not null"
                    checked={value === true}
                    onChange={this.onChange}
                />
                <label htmlFor="bool-false">&nbsp;not null</label>
                <br/>
                <input
                    name="empty"
                    type="radio"
                    value="empty"
                    checked={value === true}
                    onChange={this.onChange}
                />
                <label htmlFor="bool-false">&nbsp;empty</label>
                <br/>
                <input
                    name="not empty"
                    type="radio"
                    value="notempty"
                    checked={value === true}
                    onChange={this.onChange}
                />
                <label htmlFor="bool-false">&nbsp;not empty</label>
                <input type = "text" />
            </div>
        );
    }
}

