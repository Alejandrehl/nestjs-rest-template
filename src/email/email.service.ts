import { Injectable } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';

@Injectable()
export class EmailService {
  public constructor(
    @InjectSendGrid() private readonly sendgridClient: SendGridService,
  ) {}

  async sendWelcomeMessage(
    to: string,
    email: string,
    password: string,
    emailValidationCode: string,
  ) {
    return await this.sendgridClient.send({
      to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Bienvenido a ${process.env.APPLICATION_NAME}`,
      text: 'Tu cuenta ha sido creada con éxito',
      html: `<div>
            <strong>¡Bienvenido a ${process.env.APPLICATION_NAME}!</strong>
            <br />
            <br />
            <label>Los datos de tu nueva cuenta son:</label>
            <ul>
                <li>Correo electrónico: ${email}</li>
                <li>Contraseña: ${password}</li>
                <li>Código para válidar tu correo electrónico: ${emailValidationCode}</li>
            </ul>
            <br />
            <label>Saludos</label>
          </div>`,
    });
  }

  async sendPasswordRecoveryMessage(to: string, newPassword: string) {
    return await this.sendgridClient.send({
      to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Recuperación de contraseña`,
      text: 'Haz recuperado tu contraseña',
      html: `<div>
          <label>Hola ${to} te enviamos tu nueva contraseña, 
              una vez ingresado al sitio podrás cambiarla 
              cuando quieras: <strong>${newPassword}</strong></label>
          <br />
          <label>Saludos</label>
        </div>`,
    });
  }
}
