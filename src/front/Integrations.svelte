<script>
    import {Button, Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardText, CardTitle, Col, Container, Row, Icon} from "sveltestrap";
    import { pop } from "svelte-spa-router";
</script>

<main>
    <h1>Integraciones de otras APIs</h1>
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
                            <Row cols={1}>
                                <Col>
                                    <a href="/#/productions-vehicles/graph5">
                                    <Button color="info">API externa 1</Button></a>
                                </Col>
                                <br>
                                <br>
                                <Col>
                                    <a href="/#/productions-vehicles/graph6">
                                        <Button color="info">API externa 2</Button></a>
                                </Col>
                                <br>
                                <br>
                                <Col>  
                                    <a href="/#/productions-vehicles/graph3">
                                        <Button color="warning">API de SOS, Grupo 23</Button></a>
                                </Col>
                                <br>
                                <br>
                                <Col>  
                                    <a href="/#/productions-vehicles/graph4">
                                        <Button color="warning">API de SOS, Grupo 10</Button></a>
                                </Col>
                            </Row>
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
                            <Row cols={1}>
                                <Col>
                                    <a href="/#/in-use-vehicles/integracion1">
                                    <Button color="warning">Videojuegos (API EXTERNA)</Button></a>
                                </Col>
                                <br>
                                <br>
                                <Col>
                                    <a href="/#/in-use-vehicles/integracion2">
                                        <Button color="info">Public expenditure stats (API de SOS, Grupo 27)</Button></a>
                                </Col>
                                <br>
                                <br>
                                <Col>  
                                    <a href="/#/in-use-vehicles/integracion3">
                                        <Button color="info">Producción de cereal(API de SOS, Grupo 20)</Button></a>
                                </Col>
                                <br>
                                <br>
                                <Col>  
                                    <a href="/#/in-use-vehicles/integracion4">
                                        <Button color="warning">Fórmula 1: Campeonato de constructores (API EXTERNA)</Button></a>
                                </Col>
                            </Row>
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
                            <Row cols={1}>
                                <Col>
                                    <a href="/#/registrations-vehicles/integracion1">
                                    <Button color="info">API de SOS, grupo 27</Button></a>
                                </Col>
                                <br>
                                <br>
                                <Col>
                                    <a href="/#/registrations-vehicles/integracion2">
                                        <Button color="warning">API EXTERNA 1</Button></a>
                                </Col>
                                <br>
                                <br>
                                <Col>  
                                    <a href="/#/registrations-vehicles/integracion3">
                                        <Button color="info">API de SOS, grupo 30</Button></a>
                                </Col>
                                <br>
                                <br>
                                <Col>  
                                    <a href="/#/registrations-vehicles/integracion4">
                                        <Button color="warning">API EXTERNA 2</Button></a>
                                </Col>
                            </Row>
                        </CardText>
                    </CardBody>

                    <CardFooter>
                        Desarrollada por <a href="https://github.com/javrodmor29">Javier Rodríguez Morales</a>
                    </CardFooter>

                </Card>
            </Col>
        </Row>
    </Container>

    <br>
    <Button color="info" on:click="{pop}"> <Icon name="arrow-return-left"/> Volver atrás</Button>
</main>

<style>
    main{
        text-align: center;
    }
</style>