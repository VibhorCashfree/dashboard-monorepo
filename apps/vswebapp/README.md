# Project Title

The repo contains the source code for the vswebapp which is the client for Secure ID platform.

## Documentation

[Confluence](https://cashfree.atlassian.net/wiki/spaces/CE/pages/189596259/Frontend+Architecture)

## Tech Stack

**Client:** React, Redux, Styled-Components, Semantic-UI-React, recharts

**Server:** Node, Express

## Deployment

Builds are configured to run as soon as you push any changes to your Branch. In order to deploy them please follow the
jenkins url for specific environment. To check for the deployments please follow the K8s urls.

**Gamma**

[Jenkins Pipelines](https://jenkins-master.cashfree.com/job/Common%20Components/job/vswebapp/job/gamma-deploy/)

[K8s Links](https://k8s-master.cashfree.com/#/overview?namespace=vswebapp-gamma)

**Prod-test**

[Jenkins Pipelines](https://jenkins.cashfree.com/job/VerificationSuite/job/vswebapp/job/deploy/)

**Prod**

[Jenkins Pipelines](https://jenkins.cashfree.com/job/VerificationSuite/job/vswebapp/job/deployProdTest/)

## Run Locally

If you are setting this repo and if this README is broken in any way, please fix it for the next person.
A step by step series of examples that tell you how to get a development env running

Clone the project

```bash
 git clone git@bitbucket.org:cashfree/vswebapp.git
```

Go to the project directory

```bash
 cd my-project
```

Install dependencies

```bash
 npm install
```

Start the server

```bash
 npm start
```

## Running Tests

To run Snapshot test for specific components, run the following command

```bash
 npm run test /app/components/<ComponentName>
```

## Maintainers

- [Vibhor Jain](vibhor.jain@cashfree.com)
- [Kisley Shirish](kisley.shirish@cashfree.com)
