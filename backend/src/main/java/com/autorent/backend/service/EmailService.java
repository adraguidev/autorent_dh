package com.autorent.backend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.name}")
    private String appName;

    @Value("${app.base-url}")
    private String baseUrl;

    @Value("${app.support-email}")
    private String supportEmail;

    @Autowired
    public EmailService(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    public void sendRegistrationConfirmationEmail(String toEmail, String firstName, String lastName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            // Configurar destinatario y remitente
            helper.setTo(toEmail);
            helper.setFrom(fromEmail, appName);
            helper.setSubject("¡Bienvenido a " + appName + "! Confirmación de registro");

            // Crear contexto para la plantilla
            Context context = new Context();
            context.setVariable("firstName", firstName);
            context.setVariable("lastName", lastName);
            context.setVariable("email", toEmail);
            context.setVariable("appName", appName);
            context.setVariable("loginUrl", baseUrl + "/login");
            context.setVariable("supportEmail", supportEmail);
            context.setVariable("baseUrl", baseUrl);

            // Procesar la plantilla HTML
            String htmlContent = templateEngine.process("registration-confirmation", context);
            helper.setText(htmlContent, true);

            // Enviar el email
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Error al enviar email de confirmación: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Error inesperado al enviar email: " + e.getMessage(), e);
        }
    }

    public void sendPasswordResetEmail(String toEmail, String firstName, String resetToken) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setFrom(fromEmail, appName);
            helper.setSubject("Recuperación de contraseña - " + appName);

            Context context = new Context();
            context.setVariable("firstName", firstName);
            context.setVariable("email", toEmail);
            context.setVariable("appName", appName);
            context.setVariable("resetUrl", baseUrl + "/reset-password?token=" + resetToken);
            context.setVariable("supportEmail", supportEmail);
            context.setVariable("baseUrl", baseUrl);

            String htmlContent = templateEngine.process("password-reset", context);
            helper.setText(htmlContent, true);

            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Error al enviar email de recuperación: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Error inesperado al enviar email: " + e.getMessage(), e);
        }
    }
} 