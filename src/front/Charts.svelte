<script>
    import {Button, Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardText, CardTitle, Col, Container, Row, Icon} from "sveltestrap";
    import { pop } from "svelte-spa-router";
</script>

<main>
    <h1>Gráficas personales</h1>
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
                                    <a href="/#/productions-vehicles/graph">
                                    <Button color="primary">Highcharts</Button></a>
                                </Col>
                                <br>
                                <br>
                                <Col>
                                    <a href="/#/productions-vehicles/graph2">
                                        <Button color="primary">Biblioteca amcharts</Button></a>
                                </Col>
                                <br>
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
                            <a href="/#/in-use-vehicles/graph">
                            <Button color="primary">Highcharts y Morris.js</Button></a>
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
                            <a href="/#/registrations-vehicles/graph">
                            <Button color="primary">Highcharts</Button></a>
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