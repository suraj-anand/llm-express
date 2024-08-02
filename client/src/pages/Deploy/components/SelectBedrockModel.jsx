import Select from 'react-select'

import React, { useEffect, useState } from 'react'
import { useAxios } from 'hooks'
import CreateBedrockModel from './CreateBedrockModel';

export const SelectBedrockModel = ({ show }) => {
    
    // const {
    //     data,
    //     loading,
    //     status_code,
    //     call
    // } = useAxios({
    //     url: "/api/bedrock/list-models/",
    //     method: "GET"
    // });

    const [ models, setModels ] = useState([]);
    const [ selectedModel, setSelectedModel ] = useState(null);

    const [ topK, setTopK ] = useState(50);
    const [ topP, setTopP ] = useState(0.9);
    const [ temperature, setTemperature ] = useState(0.7);
    const [ max_tokens, setMaxTokens ] = useState(2048);
    const [ is_public, setIsPublic ] = useState(false);
    // useEffect(() => { call() }, [])

    const data = [
        {
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/amazon.titan-text-lite-v1:0:4k",
            "modelId": "amazon.titan-text-lite-v1:0:4k",
            "modelName": "Titan Text G1 - Lite",
            "providerName": "Amazon",
            "inputModalities": [
                "TEXT"
            ],
            "outputModalities": [
                "TEXT"
            ],
            "responseStreamingSupported": true,
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "PROVISIONED"
            ],
            "modelLifecycle": {
                "status": "ACTIVE"
            }
        },
        {
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/amazon.titan-text-lite-v1",
            "modelId": "amazon.titan-text-lite-v1",
            "modelName": "Titan Text G1 - Lite",
            "providerName": "Amazon",
            "inputModalities": [
                "TEXT"
            ],
            "outputModalities": [
                "TEXT"
            ],
            "responseStreamingSupported": true,
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "ON_DEMAND"
            ],
            "modelLifecycle": {
                "status": "ACTIVE"
            }
        },
        {
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/amazon.titan-text-express-v1:0:8k",
            "modelId": "amazon.titan-text-express-v1:0:8k",
            "modelName": "Titan Text G1 - Express",
            "providerName": "Amazon",
            "inputModalities": [
                "TEXT"
            ],
            "outputModalities": [
                "TEXT"
            ],
            "responseStreamingSupported": true,
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "PROVISIONED"
            ],
            "modelLifecycle": {
                "status": "ACTIVE"
            }
        },
        {
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/amazon.titan-text-express-v1",
            "modelId": "amazon.titan-text-express-v1",
            "modelName": "Titan Text G1 - Express",
            "providerName": "Amazon",
            "inputModalities": [
                "TEXT"
            ],
            "outputModalities": [
                "TEXT"
            ],
            "responseStreamingSupported": true,
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "ON_DEMAND"
            ],
            "modelLifecycle": {
                "status": "ACTIVE"
            }
        },
        {
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/amazon.titan-embed-image-v1:0",
            "modelId": "amazon.titan-embed-image-v1:0",
            "modelName": "Titan Multimodal Embeddings G1",
            "providerName": "Amazon",
            "inputModalities": [
                "TEXT",
                "IMAGE"
            ],
            "outputModalities": [
                "EMBEDDING"
            ],
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "PROVISIONED"
            ],
            "modelLifecycle": {
                "status": "ACTIVE"
            }
        },
        {
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/amazon.titan-embed-image-v1",
            "modelId": "amazon.titan-embed-image-v1",
            "modelName": "Titan Multimodal Embeddings G1",
            "providerName": "Amazon",
            "inputModalities": [
                "TEXT",
                "IMAGE"
            ],
            "outputModalities": [
                "EMBEDDING"
            ],
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "ON_DEMAND"
            ],
            "modelLifecycle": {
                "status": "ACTIVE"
            }
        },
        {
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/amazon.titan-image-generator-v1:0",
            "modelId": "amazon.titan-image-generator-v1:0",
            "modelName": "Titan Image Generator G1",
            "providerName": "Amazon",
            "inputModalities": [
                "TEXT",
                "IMAGE"
            ],
            "outputModalities": [
                "IMAGE"
            ],
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "PROVISIONED"
            ],
            "modelLifecycle": {
                "status": "ACTIVE"
            }
        },
        {
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/amazon.titan-image-generator-v1",
            "modelId": "amazon.titan-image-generator-v1",
            "modelName": "Titan Image Generator G1",
            "providerName": "Amazon",
            "inputModalities": [
                "TEXT",
                "IMAGE"
            ],
            "outputModalities": [
                "IMAGE"
            ],
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "ON_DEMAND"
            ],
            "modelLifecycle": {
                "status": "ACTIVE"
            }
        },
        {
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0:28k",
            "modelId": "anthropic.claude-3-sonnet-20240229-v1:0:28k",
            "modelName": "Claude 3 Sonnet",
            "providerName": "Anthropic",
            "inputModalities": [
                "TEXT",
                "IMAGE"
            ],
            "outputModalities": [
                "TEXT"
            ],
            "responseStreamingSupported": true,
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "PROVISIONED"
            ],
            "modelLifecycle": {
                "status": "ACTIVE"
            }
        },
        {
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0",
            "modelId": "anthropic.claude-3-sonnet-20240229-v1:0",
            "modelName": "Claude 3 Sonnet",
            "providerName": "Anthropic",
            "inputModalities": [
                "TEXT",
                "IMAGE"
            ],
            "outputModalities": [
                "TEXT"
            ],
            "responseStreamingSupported": true,
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "ON_DEMAND"
            ],
            "modelLifecycle": {
                "status": "ACTIVE"
            }
        },
        {
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/anthropic.claude-3-haiku-20240307-v1:0:48k",
            "modelId": "anthropic.claude-3-haiku-20240307-v1:0:48k",
            "modelName": "Claude 3 Haiku",
            "providerName": "Anthropic",
            "inputModalities": [
                "TEXT",
                "IMAGE"
            ],
            "outputModalities": [
                "TEXT"
            ],
            "responseStreamingSupported": true,
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "PROVISIONED"
            ],
            "modelLifecycle": {
                "status": "ACTIVE"
            }
        },
        {
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/anthropic.claude-3-haiku-20240307-v1:0",
            "modelId": "anthropic.claude-3-haiku-20240307-v1:0",
            "modelName": "Claude 3 Haiku",
            "providerName": "Anthropic",
            "inputModalities": [
                "TEXT",
                "IMAGE"
            ],
            "outputModalities": [
                "TEXT"
            ],
            "responseStreamingSupported": true,
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "ON_DEMAND"
            ],
            "modelLifecycle": {
                "status": "ACTIVE"
            }
        },
        {
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/cohere.embed-english-v3",
            "modelId": "cohere.embed-english-v3",
            "modelName": "Embed English",
            "providerName": "Cohere",
            "inputModalities": [
                "TEXT"
            ],
            "outputModalities": [
                "EMBEDDING"
            ],
            "responseStreamingSupported": false,
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "ON_DEMAND"
            ],
            "modelLifecycle": {
                "status": "ACTIVE"
            }
        },
        {
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/cohere.embed-multilingual-v3",
            "modelId": "cohere.embed-multilingual-v3",
            "modelName": "Embed Multilingual",
            "providerName": "Cohere",
            "inputModalities": [
                "TEXT"
            ],
            "outputModalities": [
                "EMBEDDING"
            ],
            "responseStreamingSupported": false,
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "ON_DEMAND"
            ],
            "modelLifecycle": {
                "status": "ACTIVE"
            }
        },
        {
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/meta.llama3-8b-instruct-v1:0",
            "modelId": "meta.llama3-8b-instruct-v1:0",
            "modelName": "Llama 3 8B Instruct",
            "providerName": "Meta",
            "inputModalities": [
                "TEXT"
            ],
            "outputModalities": [
                "TEXT"
            ],
            "responseStreamingSupported": true,
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "ON_DEMAND"
            ],
            "modelLifecycle": {
                "status": "ACTIVE"
            }
        },
        {
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/meta.llama3-70b-instruct-v1:0",
            "modelId": "meta.llama3-70b-instruct-v1:0",
            "modelName": "Llama 3 70B Instruct",
            "providerName": "Meta",
            "inputModalities": [
                "TEXT"
            ],
            "outputModalities": [
                "TEXT"
            ],
            "responseStreamingSupported": true,
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "ON_DEMAND"
            ],
            "modelLifecycle": {
                "status": "ACTIVE"
            }
        },
        {
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/mistral.mistral-7b-instruct-v0:2",
            "modelId": "mistral.mistral-7b-instruct-v0:2",
            "modelName": "Mistral 7B Instruct",
            "providerName": "Mistral AI",
            "inputModalities": [
                "TEXT"
            ],
            "outputModalities": [
                "TEXT"
            ],
            "responseStreamingSupported": true,
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "ON_DEMAND"
            ],
            "modelLifecycle": {
                "status": "ACTIVE"
            }
        },
        {
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/mistral.mixtral-8x7b-instruct-v0:1",
            "modelId": "mistral.mixtral-8x7b-instruct-v0:1",
            "modelName": "Mixtral 8x7B Instruct",
            "providerName": "Mistral AI",
            "inputModalities": [
                "TEXT"
            ],
            "outputModalities": [
                "TEXT"
            ],
            "responseStreamingSupported": true,
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "ON_DEMAND"
            ],
            "modelLifecycle": {
                "status": "ACTIVE"
            }
        },
        {
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/mistral.mistral-large-2402-v1:0",
            "modelId": "mistral.mistral-large-2402-v1:0",
            "modelName": "Mistral Large (2402)",
            "providerName": "Mistral AI",
            "inputModalities": [
                "TEXT"
            ],
            "outputModalities": [
                "TEXT"
            ],
            "responseStreamingSupported": true,
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "ON_DEMAND"
            ],
            "modelLifecycle": {
                "status": "ACTIVE"
            }
        }
    ]


    return (
        <div className={show ? "" : "d-none"}>
        <Select
            placeholder="Please select a llm model"
            options={data?.map(e => ({ "label": e.modelName, "value": e.modelId }))}
            onChange={(ev) => {
                setSelectedModel(data.find(e => e.modelId === ev.value))
            }}
            styles={{
                singleValue: (base) => ({ ...base, color: "white" }),
                valueContainer: (base) => ({
                    ...base,
                    background: "#000",
                    width: "100%"
                }),
                control: (base, state) => ({
                    ...base,
                    background: "#121212"
                })
                }}
            theme={(theme) => ({
            ...theme,
            // borderRadius: 0,
            colors: {
                ...theme.colors,
                /*
                * control/backgroundColor
                * menu/backgroundColor
                * option/color(selected)
                */
                neutral0: "black",
                neutral10: "white",
                neutral80: "white", //input color
                primary25: "gray", //option bg color focued
                primary: "darkgreen", //option bg color selected
                primary50: "black", // option bg color active(enavled or available)
                neutral90: "white"
            }
            })}
        />

        {
            selectedModel &&
            <>
                <div className="flex mt-4 justify-left gap-4">
                    <label htmlFor="topk">Top K ({topK}):</label>
                    <input type="range" id="topk" className="slider" min="1" max="500" value={topK} onChange={e => setTopK(e.target.value)} />
                </div>

                <div className="flex my-10 justify-left gap-4">
                    <label htmlFor="topP">Top P ({topP}):</label>
                    <input type="range" id="topP" className="slider" min="0" max="1" step={0.01} value={topP} onChange={e => setTopP(e.target.value)} />
                </div>

                <div className="flex my-10 justify-left gap-4">
                    <label htmlFor="temperature">Temperature: ({temperature})</label>
                    <input type="range" id="temperature" className="slider" min="0" max="1" step={0.01} value={temperature} onChange={e => setTemperature(e.target.value)} />
                </div>

                <div className="flex my-10 justify-left gap-4">
                    <label htmlFor="max_tokens">Max Tokens: ({max_tokens})</label>
                    <input type="range" id="max_tokens" className="slider" min="256" max="4096" value={max_tokens} onChange={e => setMaxTokens(e.target.value)} />
                </div>

                <div className="flex justify-left items-center gap-3">
                    <label htmlFor="is_public">Make this model available for everyone ?: ({is_public ? "yes" : "no"})</label>
                    <input type="checkbox" id="is_public" className='' checked={is_public} onChange={e => {
                        if(e.target.checked){setIsPublic(true)}
                        else{setIsPublic(false)}
                    }} />
                </div>
            </>
        }

        {
            selectedModel && (
                <div className="mt-8 text-lg text-bold text-left flex flex-column gap-3">
                    <p><span className='text-yellow-600'>Model Name:</span> {selectedModel?.modelName} </p>
                    <p><span className='text-yellow-600'>Model Provider:</span> {selectedModel?.providerName} </p>
                    <p><span className='text-yellow-600'>Input Modalities:</span> {selectedModel?.inputModalities.toString()} </p>
                    <p><span className='text-yellow-600'>Output Modalities:</span> {selectedModel?.outputModalities.toString()} </p>
                </div>
            )   
        }

        {
            selectedModel && <CreateBedrockModel {...{
                selectedModel,
                topK,
                topP,
                temperature,
                max_tokens,
                is_public,
            }} />
        }
        </div>
    )
}
