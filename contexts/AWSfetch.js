import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-2", // Replace with your region
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-2:b3dce3a7-c4b5-4eda-bf49-381c00bcd6a0", // Replace with your Identity Pool ID
  }),
});

export const fetchClientsFromLambda = async (userId) => {
  const lambda = new AWS.Lambda();

  const params = {
    FunctionName: "PullClients", // Replace with your Lambda function name
    Payload: JSON.stringify({
      queryStringParameters: {
        userId: userId, // Pass the user's sub as userId
      },
    }),
  };

  try {
    const response = await lambda.invoke(params).promise();
    const data = JSON.parse(response.Payload);
    return JSON.parse(data.body); // Parse the returned client list
  } catch (error) {
    console.error("Error invoking Lambda:", error);
    throw error;
  }
};
