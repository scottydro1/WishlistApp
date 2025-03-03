import AWS from "aws-sdk";

// AWS Configuration
AWS.config.update({
  region: "us-east-2", // Replace with your region
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-2:b3dce3a7-c4b5-4eda-bf49-381c00bcd6a0", // Replace with your Identity Pool ID
  }),
});

// Function to save client data to DynamoDB
export const saveTaskData = async (taskData) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "TASKS", // Replace with your DynamoDB table name
    Item: taskData, // The object to store
  };

  try {
    await dynamoDB.put(params).promise();
    console.log("Data successfully saved to DynamoDB.");
  } catch (error) {
    console.error("Error saving data to DynamoDB:", error);
    throw error;
  }
};
