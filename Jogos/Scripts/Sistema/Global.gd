extends Control

var global_score = 0
var game_time = 0.0
var movimentos = 0
var currentJogo

var paciente_atual
var paciente_cpf

var instituition
var currentFisio

func get_score():
	return str(global_score)

func get_time():
	return str(game_time)
	
func get_moves():
	return str(movimentos)
	
func get_paciente_nome():
	return str(paciente_atual)
	
func get_paciente_cpf():
	return str(paciente_cpf)
	
func get_instituition():
	return str(instituition)
	
func get_fisio_nome():
	return str(currentFisio.name.stringValue)
	
func get_fisio_email():
	return str(currentFisio.email.stringValue)
	
func get_jogo():
	return currentJogo
	

