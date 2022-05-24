<script>
    import {Button, Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardText, CardTitle, Col, Container, Row} from "sveltestrap";
</script>

<main>
    <h1 id="title">SOS2122-21</h1>

    <Container>
        <Row>
            <Col>
                <Card>
                    <h3>Project description:</h3> Nuestro trabajo consiste en la producción de vehículos,las matriculaciones de vehículos nuevos y los vehículos en uso.
                
                    <h3>Repositorio: </h3> <a href="https://github.com/gti-sos/SOS2122-21">gti-sos/SOS2122-21</a>
                    
                    <h3>URL: </h3><a href="http://sos2122-21.herokuapp.com"> http://sos2122-21.herokuapp.com </a>

                    <h3>Funcionalidades: </h3>
                    
                    <CardText>
                        <a href="/#/info">
                            <Button outline color="secondary">Info</Button></a>
                        <a href="/#/analytics">
                            <Button color="primary">Gráfica conjunta</Button></a>
                        <a href="/#/integrations">
                            <Button color="primary">Integraciones</Button></a>
                        <a href="/#/charts">
                            <Button color="primary">Gráficas individuales</Button></a>
                    </CardText>
                    <br>
                </Card>
            </Col>
        </Row>
    </Container>
    <br>
<h3>APIs desarrolladas</h3> 
        <Container>
            <Row>
                <Col xs="6" sm="4">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <h5>Productions vehicles</h5>
                            </CardTitle>
                        </CardHeader>

                        <CardBody>
                            <CardText>
                                <a href="http://sos2122-21.herokuapp.com/api/v1/productions-vehicles">
                                <Button color="primary">API</Button></a>

                                <a href="http://sos2122-21.herokuapp.com/api/v1/productions-vehicles/docs"
                                    ><Button color="info">Documentación</Button></a>
                    
                                <a href="/#/productions-vehicles">
                                <Button color="warning">Interfaz</Button>
                                </a>
                            </CardText>
                        </CardBody>

                        <CardFooter>
                            Desarrollada por <a href="https://github.com/marialc0">María Lacañina Camacho</a>
                        </CardFooter>

                    </Card>
                </Col>

                <Col xs="6" sm="4">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <h5>In use vehicles</h5>
                            </CardTitle>
                        </CardHeader>

                        <CardBody>
                            <CardText>
                                <a href="http://sos2122-21.herokuapp.com/api/v1/in-use-vehicles">
                                <Button color="primary">API</Button></a>

                                <a href="http://sos2122-21.herokuapp.com/api/v1/in-use-vehicles/docs"
                                    ><Button color="info">Documentación</Button></a>
                    
                                <a href="/#/in-use-vehicles">
                                <Button color="warning">Interfaz</Button>
                                </a>
                            </CardText>
                        </CardBody>

                        <CardFooter>
                            Desarrollada por <a href="https://github.com/antruigon">Antonio Ruiz González</a>
                        </CardFooter>

                    </Card>
                </Col>

                <Col xs="6" sm="4">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <h5>Registrations vehicles</h5>
                            </CardTitle>
                        </CardHeader>

                        <CardBody>
                            <CardText>
                                <a href="http://sos2122-21.herokuapp.com/api/v1/registrations-vehicles">
                                <Button color="primary">API</Button></a>

                                <a href="http://sos2122-21.herokuapp.com/api/v1/registrations-vehicles/docs"
                                    ><Button color="info">Documentación</Button></a>
                    
                                <a href="/#/registrations-vehicles">
                                <Button color="warning">Interfaz</Button>
                                </a>
                            </CardText>
                        </CardBody>

                        <CardFooter>
                            Desarrollada por <a href="https://github.com/javrodmor29">Javier Rodríguez Morales</a>
                        </CardFooter>

                    </Card>
                </Col>
            </Row>
        </Container>

</main>

<style>
    #title{
        text-align: center;
    }
    main{
        text-align: center;
    }

</style>