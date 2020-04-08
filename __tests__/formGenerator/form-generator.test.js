
import FormGen from "../../src/components/FormGenerator/form-generator";
import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";

// 0. Checking whereas all the options are rendering properly or not.
test("Form Generator renders without crashing", () => {
    const div = document.createElement("div");
    const options = {
            "form":{
            "props":{
                "id":"form1",
                "action":"https://www.fintellix.com",
                "method":"get"
            },
            "eventHandlers":[
                {
                    "event":"submit",
                    "handler":"skundSubmitForm"
                }
            ]
            },
            "rows":[
            {
                "rowElements":[
                    {
                        "elementType":"input",
                        "props":{
                        "type":"text",
                        "id":"firstname",
                        "className":"my-firstname-class",
                        "title":"Firstname",
                        "placeholder":"Your input",
                        "required":"required"
                        },
                        "eventHandlers":[
                        {
                            "event":"change",
                            "handler":"submitForm"
                        }
                        ]
                    }
                ],
                "rowLabel":{
                    "name":"Firstname",
                    "props":{
                        "className":"vs-body-regular-primary"
                    }
                }
            },
            {
                "rowElements":[
                    {
                        "elementType":"input",
                        "props":{
                        "type":"text",
                        "id":"lastname",
                        "className":"lastname-class",
                        "title":"Lastname",
                        "placeholder":"Your input",
                        "required":"required"
                        }
                    }
                ],
                "rowLabel":{
                    "name":"Lastname",
                    "props":{
                        "className":"vs-body-regular-primary"
                    }
                }
            },
            {
                "rowElements":[
                    {
                        "elementType":"input",
                        "props":{
                        "type":"email",
                        "id":"email",
                        "className":"email-class",
                        "title":"Email",
                        "placeholder":"Your input"
                        },
                        "eventHandlers":[
                        {
                            "event":"change",
                            "handler":"submitForm"
                        }
                        ]
                    }
                ],
                "rowLabel":{
                    "name":"Email",
                    "props":{
                        "className":"vs-body-regular-primary"
                    }
                }
            },
            {
                "rowElements":[
                    {
                        "elementType":"input",
                        "props":{
                        "type":"password",
                        "id":"password",
                        "className":"password-class",
                        "title":"Password",
                        "placeholder":"Your input"
                        },
                        "eventHandlers":[
                        {
                            "event":"change",
                            "handler":"submitForm"
                        }
                        ]
                    }
                ],
                "rowLabel":{
                    "name":"Password",
                    "props":{
                        "className":"vs-body-regular-primary"
                    }
                }
            },
            {
                "rowElements":[
                    {
                        "elementType":"input",
                        "props":{
                        "type":"file",
                        "id":"file",
                        "className":"file-class",
                        "title":"Upload File",
                        "placeholder":"Select File"
                        },
                        "eventHandlers":[
                        {
                            "event":"change",
                            "handler":"submitForm"
                        }
                        ]
                    }
                ],
                "rowLabel":{
                    "name":"Upload Your File",
                    "props":{
                        "className":"vs-body-regular-primary"
                    }
                }
            },
            {
                "rowElements":[
                    {
                        "elementType":"input",
                        "props":{
                        "type":"radio",
                        "id":"male",
                        "name":"gender",
                        "className":"male-class"
                        },
                        "elementLabel":{
                        "name":"male",
                        "props":{
                            "className":"vs-radiobutton1"
                        }
                        },
                        "eventHandlers":[
                        {
                            "event":"change",
                            "handler":"submitForm"
                        }
                        ]
                    },
                    {
                        "elementType":"input",
                        "props":{
                        "type":"radio",
                        "id":"female",
                        "name":"gender",
                        "required":"required"
                        },
                        "elementLabel":{
                        "name":"female",
                        "props":{
                            "className":"vs-radiobutton2"
                        }
                        },
                        "eventHandlers":[
                        {
                            "event":"change",
                            "handler":"submitForm"
                        }
                        ]
                    }
                ],
                "rowLabel":{
                    "name":"Gender",
                    "props":{
                        "className":"vs-label"
                    }
                }
            },
            {
                "rowElements":[
                    {
                        "elementType":"select",
                        "props":{
                        "id":"countries",
                        "className":"vs-dropdown",
                        "required":"required",
                        "defaultValue":"IN"
                        },
                        "eventHandlers":[
                        {
                            "event":"change",
                            "handler":"submitForm"
                        }
                        ],
                        "options":[
                        {
                            "props":{
                                "value":""
                            },
                            "optionLabel":"Select One"
                        },
                        {
                            "props":{
                                "value":"IN"
                            },
                            "optionLabel":"India"
                        },
                        {
                            "props":{
                                "value":"US"
                            },
                            "optionLabel":"USA"
                        },
                        {
                            "props":{
                                "value":"CA"
                            },
                            "optionLabel":"Canada"
                        }
                        ]
                    }
                ],
                "rowLabel":{
                    "name":"Select Country",
                    "props":{
                        "className":"vs-body-regular-primary"
                    }
                }
            },
            {
                "rowElements":[
                    {
                        "elementType":"textarea",
                        "props":{
                        "id":"story",
                        "name":"story",
                        "rows":"5",
                        "cols":"33",
                        "maxLength":"500",
                        "required":"required",
                        "className":"my-textarea",
                        "placeholder":"Your input"
                        },
                        "eventHandlers":[
                        {
                            "event":"change",
                            "handler":"submitForm"
                        }
                        ]
                    }
                ],
                "rowLabel":{
                    "name":"Your Story:",
                    "props":{
                        "className":"vs-body-regular-primary"
                    }
                }
            },
            {
                "rowElements":[
                    {
                        "elementType":"img",
                        "props":{
                        "id":"imgID",
                        "name":"profileImage",
                        "src":"https://www.prlog.org/12405743-fintellix-logo.png",
                        "alt":"Smiley face",
                        "width":"100px",
                        "height":"50px",
                        "className":"myImageClass"
                        },
                        "eventHandlers":[
                        {
                            "event":"change",
                            "handler":"submitForm"
                        }
                        ]
                    }
                ],
                "rowLabel":{
                    "name":"Image:",
                    "props":{
                        "class":"vs-body-regular-primary"
                    }
                }
            }
            ]
        }
    ReactDOM.render(<FormGen options={options} />, div);
  });
 
  //1. check if form is rendered if no row items have been passed
  test('check if form is rendered if no row items have been passed',()=>{
    const options = {
        "form":{
            "props":{
                "id":"form1",
                "action":"https://www.fintellix.com",
                "method":"get"
            },
            "eventHandlers":[
                {
                    "event":"submit",
                    "handler":"SubmitForm"
                }
            ]
            }
            
    }
    const wrapper = mount(<FormGen options={options}/>);          
    const form = wrapper.find('form');
    expect(form.prop('id')).toEqual('form1');
  }) 
   
   //2. check if id is set to form
                  test('id is set to form', () => {
                    const options = {
                         "form":{
                            "props":{
                                "id":"form1",
                                "action":"https://www.fintellix.com",
                                "method":"get"
                            },
                            "eventHandlers":[
                                {
                                    "event":"submit",
                                    "handler":"SubmitForm"
                                }
                            ]
                            },
                            "rows":[{
                                "rowElements":[
                                    {
                                        "elementType":"input",
                                        "props":{
                                        "type":"text",
                                        "id":"firstname",
                                        "className":"my-firstname-class",
                                        "title":"Firstname",
                                        "placeholder":"Your input",
                                        "required":"required"
                                        },
                                        "eventHandlers":[
                                        {
                                            "event":"change",
                                            "handler":"submitForm"
                                        }
                                        ]
                                    }
                                ],
                                "rowLabel":{
                                    "name":"Firstname",
                                    "props":{
                                        "className":"vs-body-regular-primary"
                                    }
                                }
                            }]
                    }
                    const wrapper = mount(<FormGen options={options}/>);
                    const form = wrapper.find('form');
                    expect(form).toHaveLength(1);
                    expect(form.prop('id')).toEqual('form1');
                   }) 

 //3. check if action and method is set to form
                  test('action and method is set to form', () => {
                    const options = {
                        "form":{
                            "props":{
                                "id":"form1",
                                "action":"https://www.fintellix.com",
                                "method":"get"
                            },
                            "eventHandlers":[
                                {
                                    "event":"submit",
                                    "handler":"SubmitForm"
                                }
                            ]
                            },
                            "rows":[{
                                "rowElements":[
                                    {
                                        "elementType":"input",
                                        "props":{
                                        "type":"text",
                                        "id":"firstname",
                                        "className":"my-firstname-class",
                                        "title":"Firstname",
                                        "placeholder":"Your input",
                                        "required":"required"
                                        },
                                        "eventHandlers":[
                                        {
                                            "event":"change",
                                            "handler":"submitForm"
                                        }
                                        ]
                                    }
                                ],
                                "rowLabel":{
                                    "name":"Firstname",
                                    "props":{
                                        "className":"vs-body-regular-primary"
                                    }
                                }
                            }]
                }
                
                    const wrapper = mount(<FormGen options={options}/>)
                    
                    const form = wrapper.find('form');
                    expect(form).toHaveLength(1);
                    expect(form.prop('action')).toEqual('https://www.fintellix.com');
                    expect(form.prop('method')).toEqual('get');
                    console.log(wrapper.debug())
                   })

 //4. check for validation, if required is set to input type 
                  test('if required is set to input type', () => {
                    const options = {
                        "form":{
                            "props":{
                                "id":"form1",
                                "action":"https://www.fintellix.com",
                                "method":"get"
                            },
                            "eventHandlers":[
                                {
                                    "event":"submit",
                                    "handler":"SubmitForm"
                                }
                            ]
                            },
                            "rows":[{
                                "rowElements":[
                                    {
                                        "elementType":"input",
                                        "props":{
                                        "type":"text",
                                        "id":"firstname",
                                        "className":"my-firstname-class",
                                        "title":"Firstname",
                                        "placeholder":"Your input",
                                        "required":"required"
                                        },
                                        "eventHandlers":[
                                        {
                                            "event":"change",
                                            "handler":"submitForm"
                                        }
                                        ]
                                    }
                                ],
                                "rowLabel":{
                                    "name":"Firstname",
                                    "props":{
                                        "className":"vs-body-regular-primary"
                                    }
                                }
                            }]
                    }
                    const wrapper = mount(<FormGen options={options}/>);
                    const form = wrapper.find('input');
                    expect(form).toHaveLength(1);
                    expect(form.prop('required')).toEqual('required');
                    expect(form.prop('id')).toEqual('firstname');
                   })


   //5. check if text input with label is rendered
  test('renders text input with label', () => {
    const options = {
        "form":{
            "props":{
                "id":"form1",
                "action":"https://www.fintellix.com",
                "method":"get"
            },
            "eventHandlers":[
                {
                    "event":"submit",
                    "handler":"SubmitForm"
                }
            ]
            },
            "rows":[
            {
                "rowElements":[
                    {
                        "elementType":"input",
                        "props":{
                        "type":"text",
                        "id":"firstname",
                        "className":"my-firstname-class",
                        "title":"Firstname",
                        "placeholder":"Your input",
                        "required":"required"
                        },
                        "eventHandlers":[
                        {
                            "event":"change",
                            "handler":"submitForm"
                        }
                        ]
                    }
                ],
                "rowLabel":{
                    "name":"Firstname",
                    "props":{
                        "className":"vs-body-regular-primary"
                    }
                }
            }]
    }
    const wrapper = mount(<FormGen options={options}/>);
    const label = wrapper.find('label');
    expect(label).toHaveLength(1);
    expect(label.text()).toEqual('Firstname');
    expect(label.prop('className')).toEqual('vs_body_regular_primary vs-body-regular-primary');
    console.log(label.debug())
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
    expect(input.prop('type')).toEqual('text');
    expect(input.prop('id')).toEqual('firstname');
    expect(input.prop('className')).toEqual('vs-textbox my-firstname-class');
    expect(input.prop('title')).toEqual('Firstname');
    expect(input.prop('placeholder')).toEqual('Your input');
   })

    //6. check if email input with label is rendered
  test('renders email input with label', () => {
    const options = {
        "form":{
            "props":{
                "id":"form1",
                "action":"https://www.fintellix.com",
                "method":"get"
            },
            "eventHandlers":[
                {
                    "event":"submit",
                    "handler":"SubmitForm"
                }
            ]
            },
            "rows":[
                {
                    "rowElements":[
                       {
                          "elementType":"input",
                          "props":{
                             "type":"email",
                             "id":"email",
                             "className":"email-class",
                             "title":"Email",
                             "placeholder":"Your input"
                          },
                          "eventHandlers":[
                             {
                                "event":"change",
                                "handler":"submitForm"
                             }
                          ]
                       }
                    ],
                    "rowLabel":{
                       "name":"Email",
                       "props":{
                          "className":"vs-body-regular-primary"
                       }
                    }
                 }]
    }
    const wrapper = mount(<FormGen options={options}/>);
    const label = wrapper.find('label');
    expect(label).toHaveLength(1);
    expect(label.text()).toEqual('Email');
    expect(label.prop('className')).toEqual('vs_body_regular_primary vs-body-regular-primary');
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
    expect(input.prop('type')).toEqual('email');
    expect(input.prop('id')).toEqual('email');
    expect(input.prop('className')).toEqual('vs-textbox email-class');
    expect(input.prop('title')).toEqual('Email');
    expect(input.prop('placeholder')).toEqual('Your input');
   })

    //7. check if password input with label is rendered
  test('renders password input with label', () => {
    const options = {
        "form":{
            "props":{
                "id":"form1",
                "action":"https://www.fintellix.com",
                "method":"get"
            },
            "eventHandlers":[
                {
                    "event":"submit",
                    "handler":"SubmitForm"
                }
            ]
            },
            "rows":[
                {
                    "rowElements":[
                       {
                          "elementType":"input",
                          "props":{
                             "type":"password",
                             "id":"password",
                             "className":"password-class",
                             "title":"Password",
                             "placeholder":"Your input"
                          },
                          "eventHandlers":[
                             {
                                "event":"change",
                                "handler":"submitForm"
                             }
                          ]
                       }
                    ],
                    "rowLabel":{
                       "name":"Password",
                       "props":{
                          "className":"vs-body-regular-primary"
                       }
                    }
                 }]
    }
    const wrapper = mount(<FormGen options={options}/>)
    const label = wrapper.find('label');
    expect(label).toHaveLength(1);
    expect(label.text()).toEqual('Password');
    expect(label.prop('className')).toEqual('vs_body_regular_primary vs-body-regular-primary');
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
    expect(input.prop('type')).toEqual('password');
    expect(input.prop('id')).toEqual('password');
    expect(input.prop('className')).toEqual('vs-textbox password-class');
    expect(input.prop('title')).toEqual('Password');
    expect(input.prop('placeholder')).toEqual('Your input');
   })

 
    //8. check if file input with label is rendered
    test('renders file input with label', () => {
        const options = {
            "form":{
                "props":{
                    "id":"form1",
                    "action":"https://www.fintellix.com",
                    "method":"get"
                },
                "eventHandlers":[
                    {
                        "event":"submit",
                        "handler":"SubmitForm"
                    }
                ]
                },
                "rows":[
                    {
                        "rowElements":[
                           {
                              "elementType":"input",
                              "props":{
                                 "type":"file",
                                 "id":"file",
                                 "className":"file-class",
                                 "title":"Upload File",
                                 "placeholder":"Select File"
                              },
                              "eventHandlers":[
                                 {
                                    "event":"change",
                                    "handler":"submitForm"
                                 }
                              ]
                           }
                        ],
                        "rowLabel":{
                           "name":"Upload Your File",
                           "props":{
                              "className":"vs-body-regular-primary"
                           }
                        }
                     }]
        }
        const wrapper = mount(<FormGen options={options}/>);
        const label = wrapper.find('label');
        expect(label).toHaveLength(1);
        expect(label.text()).toEqual('Upload Your File');
        expect(label.prop('className')).toEqual('vs_body_regular_primary vs-body-regular-primary');
        const input = wrapper.find('input');
        expect(input).toHaveLength(1);
        expect(input.prop('type')).toEqual('file');
        expect(input.prop('id')).toEqual('file');
        expect(input.prop('className')).toEqual('vs-textbox file-class');
        expect(input.prop('title')).toEqual('Upload File');
        expect(input.prop('placeholder')).toEqual('Select File');
       })


 //9. check if textarea is rendered with label
       test('renders textarea input with label', () => {
        const options = {
            "form":{
                "props":{
                    "id":"form1",
                    "action":"https://www.fintellix.com",
                    "method":"get"
                },
                "eventHandlers":[
                    {
                        "event":"submit",
                        "handler":"SubmitForm"
                    }
                ]
                },
                "rows":[
                    {
                        "rowElements":[
                           {
                              "elementType":"textarea",
                              "props":{
                                 "id":"story",
                                 "name":"story",
                                 "rows":"5",
                                 "cols":"33",
                                 "maxLength":"500",
                                 "required":"required",
                                 "className":"my-textarea",
                                 "placeholder":"Your input"
                              },
                              "eventHandlers":[
                                 {
                                    "event":"change",
                                    "handler":"submitForm"
                                 }
                              ]
                           }
                        ],
                        "rowLabel":{
                           "name":"Your Story:",
                           "props":{
                              "className":"vs-body-regular-primary"
                           }
                        }
                     }]
        }
        const wrapper = mount(<FormGen options={options}/>);
        const label = wrapper.find('label');
        expect(label).toHaveLength(1);
        expect(label.text()).toEqual('Your Story:');
        const input = wrapper.find('textarea');
        expect(input).toHaveLength(1);
        expect(input.prop('id')).toEqual('story');
        expect(input.prop('className')).toEqual('vs-textarea my-textarea');
        expect(input.prop('name')).toEqual('story');
        expect(input.prop('placeholder')).toEqual('Your input');
        expect(input.prop('maxLength')).toEqual('500');
        expect(input.prop('cols')).toEqual('33');
        expect(input.prop('rows')).toEqual('5');
       })

 //11. check if datepicker is rendered with label
         test('renders datepicker with label', () => {
            const options = {
                "form":{
                    "props":{
                        "id":"form1",
                        "action":"https://www.fintellix.com",
                        "method":"get"
                    },
                    "eventHandlers":[
                        {
                            "event":"submit",
                            "handler":"SubmitForm"
                        }
                    ]
                    },
                    "rows":[
                        {
                            "rowElements":[
                               {
                                  "elementType":"datepicker",
                                  "props":{
                                     "id":"datepickerID",
                                     "name":"datepicker",
                                     "data-options":"{\"displayFormat\": \"DD/MM/YYYY\", \"iconAlignment\":\"left\", \"showErrorMessage\": true, \"dateStringAlignment\": \"left\", \"lowerLimit\": \"08/07/2017\", \"upperLimit\": \"30/12/2018\", \"validationMessages\": [{\"inValidFormat\": \"Invalid DOB\"}, { \"outsideRange\": \"\"}] , \"isDisabled\": false, \"showButtons\": false, \"dateButtonPrimary\": \"Ok\", \"showClearIcon\": false, \"manualEntry\": true, \"disabledList\": [\"08/07/2017\", \"09/07/2017\", \"01/11/2020\", \"20/11/2019\"], \"indicatorList\": [{ \"dates\": [\"01/10/2019\",\"02/11/2019\"], \"color\": \"#333\" }, { \"dates\": [\"02/09/2019\",\"01/08/2019\"], \"color\": \"#ff0000\" }],\"calendarLocation\":\"down\"}",
                                     "className":"my-datepicker-class"
                                  },
                                  "eventHandlers":[
                                     {
                                        "event":"blur",
                                        "handler":"submitForm"
                                     }
                                  ]
                               }
                            ],
                            "rowLabel":{
                               "name":"Select Date:",
                               "props":{
                                  "className":"vs-body-regular-primary"
                               }
                            }
                         }]
            }
            const wrapper = mount(<FormGen options={options}/>);
            const label = wrapper.find('label');
            expect(label).toHaveLength(1);
            expect(label.text()).toEqual('Select Date:');
            expect(label.prop('className')).toEqual('vs-label')
            const input = wrapper.find('date-picker');
            console.log("hi",wrapper.debug())
            expect(input).toHaveLength(1);
            expect(input.prop('id')).toEqual('datepickerID');
            expect(input.prop('name')).toEqual('datepicker');
            expect(input.prop('className')).toEqual('my-datepicker-class');
           })
   
 //12. check if tag selector is rendered with label
         test('renders tag selector with label', () => {
            const options = {
                "form":{
                    "props":{
                        "id":"form1",
                        "action":"https://www.fintellix.com",
                        "method":"get"
                    },
                    "eventHandlers":[
                        {
                            "event":"submit",
                            "handler":"SubmitForm"
                        }
                    ]
                    },
                    "rows":[
                        {
                            "rowElements":[
                               {
                                  "elementType":"tagselector",
                                  "props":{
                                     "id":"tagselectorID",
                                     "name":"tagselector",
                                     "data-options":"{\"placeholder\": \"Select skills\", \"maxItemCounter\": 2, \"searchWithHelper\": true, \"canRemoveAll\": true, \"allowNewValue\": true, \"showHierarchy\": false, \"data\": [{ \"value\": \"Javascript\", \"key\": \"Javascript\" }, { \"value\": \"CSS\", \"key\": \"CSS\" }, { \"value\": \"JQuery\", \"key\": \"JQuery\" }, { \"value\": \"Angular\", \"key\": \"Angular\" }, { \"value\": \"MonogDB\", \"key\": \"MonogDB\" },{ \"value\": \"NodeJs\", \"key\": \"NodeJs\" }]}"
                                  },
                                  "eventHandlers":[
                                     {
                                        "event":"blur",
                                        "handler":"submitForm"
                                     }
                                  ]
                               }
                            ],
                            "rowLabel":{
                               "name":"Select a Tag:",
                               "props":{
                                  "className":"vs-body-regular-primary"
                               }
                            }
                         }]
            }
            const wrapper = mount(<FormGen options={options}/>);
            const label = wrapper.find('label');
            expect(label).toHaveLength(1);
            expect(label.text()).toEqual('Select a Tag:');
            expect(label.prop('className')).toEqual('vs-label');
            const input = wrapper.find('tag-selector');
            expect(input).toHaveLength(1);
            expect(input.prop('id')).toEqual('tagselectorID');
            expect(input.prop('name')).toEqual('tagselector');
           })

        
 //13. check if date hierarchy is rendered with label
         test('renders date hierarchy with label', () => {
            const options = {
                "form":{
                    "props":{
                        "id":"form1",
                        "action":"https://www.fintellix.com",
                        "method":"get"
                    },
                    "eventHandlers":[
                        {
                            "event":"submit",
                            "handler":"SubmitForm"
                        }
                    ]
                    },
                    "rows":[
                        {
                            "rowElements":[
                               {
                                  "elementType":"datehierarchy",
                                  "props":{
                                     "id":"hierarchyID",
                                     "name":"datehierarchy",
                                     "data-options":"{\"lowerLimit\":\"2000\",\"upperLimit\":\"2025\",\"disabledList\":[\"01/01/2000\",\"02/04/2000\",\"09/05/2000\", \"8/01/2000\", \"11/11/2025\"]}"
                                  },
                                  "eventHandlers":[
                                     {
                                        "event":"change",
                                        "handler":"submitForm"
                                     }
                                  ]
                               }
                            ],
                            "rowLabel":{
                               "name":"Select Date(s):",
                               "props":{
                                  "className":"vs-body-regular-primary"
                               }
                            }
                         }]
            }
            const wrapper = mount(<FormGen options={options}/>)
            const label = wrapper.find('label');
            expect(label).toHaveLength(1);
            expect(label.text()).toEqual('Select Date(s):');
            expect(label.prop('className')).toEqual('vs-label');
            const input = wrapper.find('date-hierarchy');
            expect(input).toHaveLength(1);
            expect(input.prop('id')).toEqual('hierarchyID');
            expect(input.prop('name')).toEqual('datehierarchy');
           })

           
//14. check if image is rendered with label
         test('renders image with label', () => {
            const options = {
                "form":{
                    "props":{
                        "id":"form1",
                        "action":"https://www.fintellix.com",
                        "method":"get"
                    },
                    "eventHandlers":[
                        {
                            "event":"submit",
                            "handler":"SubmitForm"
                        }
                    ]
                    },
                    "rows":[
                        {
                            "rowElements":[
                               {
                                  "elementType":"img",
                                  "props":{
                                     "id":"imgID",
                                     "name":"profileImage",
                                     "src":"https://www.prlog.org/12405743-fintellix-logo.png",
                                     "alt":"Smiley face",
                                     "width":"100px",
                                     "height":"50px",
                                     "className":"myImageClass"
                                  },
                                  "eventHandlers":[
                                     {
                                        "event":"change",
                                        "handler":"submitForm"
                                     }
                                  ]
                               }
                            ],
                            "rowLabel":{
                               "name":"Image:",
                               "props":{
                                  "class":"vs-body-regular-primary"
                               }
                            }
                         }]
            }
            const wrapper = mount(<FormGen options={options}/>);
            const label = wrapper.find('label');
            expect(label).toHaveLength(1);
            expect(label.text()).toEqual('Image:');
            const input = wrapper.find('img');
            expect(input).toHaveLength(1);
            expect(input.prop('id')).toEqual('imgID');
            expect(input.prop('name')).toEqual('profileImage');
            expect(input.prop('src')).toEqual('https://www.prlog.org/12405743-fintellix-logo.png');
            expect(input.prop('alt')).toEqual('Smiley face');
            expect(input.prop('className')).toEqual('myImageClass');
            expect(input.prop('height')).toEqual('50px');
            expect(input.prop('width')).toEqual('100px');
           })

 //15. check if Dropdown is rendered with label
         test('renders dropdown with label', () => {
            const options = {
                "form":{
                    "props":{
                        "id":"form1",
                        "action":"https://www.fintellix.com",
                        "method":"get"
                    },
                    "eventHandlers":[
                        {
                            "event":"submit",
                            "handler":"SubmitForm"
                        }
                    ]
                    },
                    "rows":[
                        {
                            "rowElements":[
                               {
                                  "elementType":"select",
                                  "props":{
                                     "id":"countries",
                                     "className":"vs-dropdown",
                                     "required":"required",
                                     "defaultValue":"IN"
                                  },
                                  "eventHandlers":[
                                     {
                                        "event":"change",
                                        "handler":"submitForm"
                                     }
                                  ],
                                  "options":[
                                     {
                                        "props":{
                                           "value":""
                                        },
                                        "optionLabel":"Select One"
                                     },
                                     {
                                        "props":{
                                           "value":"IN"
                                        },
                                        "optionLabel":"India"
                                     },
                                     {
                                        "props":{
                                           "value":"US"
                                        },
                                        "optionLabel":"USA"
                                     },
                                     {
                                        "props":{
                                           "value":"CA"
                                        },
                                        "optionLabel":"Canada"
                                     }
                                  ]
                               }
                            ],
                            "rowLabel":{
                               "name":"Select Country",
                               "props":{
                                  "className":"vs-body-regular-primary"
                               }
                            }
                         }]
            }
            const wrapper = mount(<FormGen options={options}/>);
            const label = wrapper.find('label');
            expect(label).toHaveLength(1);
            expect(label.text()).toEqual('Select Country');
            expect(label.prop('className')).toEqual('vs_body_regular_primary vs-body-regular-primary');
            const input = wrapper.find('select');
            expect(input).toHaveLength(1);
            expect(input.prop('id')).toEqual('countries');
            expect(input.prop('defaultValue')).toEqual('IN');
            expect(input.prop('className')).toEqual('vs-dropdown');
           })

                    
    //16. check if radio button with label is rendered
    test('renders file input with label', () => {
        const options = {
            "form":{
                "props":{
                    "id":"form1",
                    "action":"https://www.fintellix.com",
                    "method":"get"
                },
                "eventHandlers":[
                    {
                        "event":"submit",
                        "handler":"SubmitForm"
                    }
                ]
                },
                "rows":[
                    {
                        "rowElements":[
                           {
                              "elementType":"input",
                              "props":{
                                 "type":"radio",
                                 "id":"male",
                                 "name":"gender",
                                 "className":"male-class"
                              },
                              "elementLabel":{
                                 "name":"male",
                                 "props":{
                                    "className":"vs-radiobutton1"
                                 }
                              },
                              "eventHandlers":[
                                 {
                                    "event":"change",
                                    "handler":"submitForm"
                                 }
                              ]
                           },
                           {
                              "elementType":"input",
                              "props":{
                                 "type":"radio",
                                 "id":"female",
                                 "name":"gender",
                                 "required":"required"
                              },
                              "elementLabel":{
                                 "name":"female",
                                 "props":{
                                    "className":"vs-radiobutton2"
                                 }
                              },
                              "eventHandlers":[
                                 {
                                    "event":"change",
                                    "handler":"submitForm"
                                 }
                              ]
                           }
                        ],
                        "rowLabel":{
                           "name":"Gender",
                           "props":{
                              "className":"vs-label"
                           }
                        }
                     }]
        }
        const wrapper = mount(<FormGen options={options}/>);
        const label1 = wrapper.find('label').at(0);
        expect(label1).toHaveLength(1);
        expect(label1.text()).toEqual('Gender');
        expect(label1.prop('className')).toEqual('vs_body_regular_primary , vs-label');
        const label2 = wrapper.find('label').at(1);
        expect(label2).toHaveLength(1);
        expect(label2.text()).toEqual('male');
        expect(label2.prop('className')).toEqual('vs-radiobutton vs-radiobutton1');
        const label3 = wrapper.find('label').at(2);
        expect(label3).toHaveLength(1);
        expect(label3.text()).toEqual('female');
        expect(label3.prop('className')).toEqual('vs-radiobutton vs-radiobutton2');
        const input_first = wrapper.find('input').at(0);
        expect(input_first).toHaveLength(1);
        expect(input_first.prop('type')).toEqual('radio');
        expect(input_first.prop('name')).toEqual('gender');
        expect(input_first.prop('id')).toEqual('male');
        const input_second = wrapper.find('input').at(1);
        expect(input_second).toHaveLength(1);
        expect(input_second.prop('type')).toEqual('radio');
        expect(input_second.prop('name')).toEqual('gender');
        expect(input_second.prop('id')).toEqual('female');
       }) 
