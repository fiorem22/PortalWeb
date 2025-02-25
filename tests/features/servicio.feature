Feature: Validar servicio de utp portal

    @servicio
    Scenario: Navegar a la pestaña de servicio
      Given el usuario ha iniciado sesión como estudiante
      When el usuario hace clic en la pestaña "Servicios"
      Then debería ver la página de servicios
