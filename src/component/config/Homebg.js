import React, { useCallback } from 'react'
import Particles from "react-particles";
import { loadFull } from "tsparticles";
export default function Particle() {
    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
    }, []);
    return (
        <div>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "#11111",
                        },
                    },
                    fpsLimit: 120,
                    interactivity: {
                        detectsOn: "window",
                        events: {
                            onClick: {
                                enable: false,
                                mode: "push"
                            },
                            onDiv: {
                                enable: false,
                                type: "circle"
                            },
                            onHover: {
                                enable: true,
                                mode: "grab",
                                parallax: {
                                    enable: true,
                                    force: 20,
                                    smooth: 20
                                }
                            },
                            resize: {
                                delay: 0.1,
                                enable: true
                            }
                        },
                        modes: {
                            attract: {
                                distance: 200,
                                duration: 0.4,
                                easing: "ease-out-quad",
                                factor: 1,
                                maxSpeed: 50,
                                speed: 1
                            },
                            bounce: {
                                distance: 200
                            },
                            bubble: {
                                distance: 400,
                                duration: 2,
                                mix: false,
                                opacity: 0.8,
                                size: 40,
                                divs: {
                                    distance: 200,
                                    duration: 0.4,
                                    mix: false,
                                }
                            },
                            connect: {
                                distance: 40,
                                links: {
                                    opacity: 0.5
                                },
                                radius: 40
                            },
                            grab: {
                                distance: 300,
                                links: {
                                    blink: false,
                                    consent: false,
                                    opacity: 1
                                }
                            },
                            push: {
                                default: false,
                                quantity: 4
                            },
                            remove: {
                                quantity: 2
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                                factor: 100,
                                speed: 1,
                                maxSpeed: 20,
                                easing: "ease-out-quad",
                                divs: {
                                    distance: 200,
                                    duration: 0.4,
                                    factor: 100,
                                    speed: 1,
                                    maxSpeed: 20,
                                    easing: "ease-out-quad",
                                }
                            },
                            slow: {
                                factor: 3,
                                radius: 200
                            },
                            trail: {
                                delay: 1,
                                pauseOnStop: false,
                                quantity: 1
                            },
                            light: {
                                area: {
                                    gradient: {
                                        start: {
                                            value: "#ffffff"
                                        },
                                        stop: {
                                            value: "#000000"
                                        }
                                    },
                                    radius: 1000
                                },
                                shadow: {
                                    color: {
                                        value: "#000000"
                                    },
                                    length: 2000
                                }
                            }
                        }
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 130,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            directions: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 6,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 35,
                        },
                        opacity: {
                            value: 0.99,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 3 },
                        },
                    },
                    detectRetina: true,
                }}
            />
        </div>
    )

}
