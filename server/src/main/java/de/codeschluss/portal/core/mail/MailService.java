package de.codeschluss.portal.core.mail;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import de.codeschluss.portal.core.appconfig.MailConfiguration;
import de.codeschluss.portal.functional.provider.ProviderEntity;
import de.codeschluss.portal.functional.user.UserEntity;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

@Service
public class MailService {
	
	private final JavaMailSender sender;
	private final Configuration freemarkerConfig;
	private final MailConfiguration mailConfig;
	
	public MailService(
			JavaMailSender sender,
			Configuration freemarkerConfig,
			MailConfiguration mailConfig) {
		this.sender = sender;
		this.freemarkerConfig = freemarkerConfig;
		this.mailConfig = mailConfig;
		
		freemarkerConfig.setClassForTemplateLoading(this.getClass(), mailConfig.getTemplateLocation());
	}
	
    public boolean sendResetPasswordMail(UserEntity user, String newPassword) {   
    	try {
	    	Map<String, Object> model = new HashMap<>();
	        model.put("name", user.getFullname());
	        model.put("newPwd", newPassword);
	        model.put("portalName", mailConfig.getPortalName());
			Template t = freemarkerConfig.getTemplate("resetpassword.ftl");
			String content = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
			String subject = mailConfig.getPortalName() + " - Ihr Passwort wurde zurück gesetzt";
			
			sendEmail(subject, content, true, user.getUsername());
			return true;
		} catch (IOException | TemplateException | MessagingException e) {
			return false;
		}
		
    }
    
    public boolean sendApplicationUserMail(ProviderEntity applicationProvider, List<String> toMails) {   
    	try {
	    	Map<String, Object> model = new HashMap<>();
	        model.put("userMail", applicationProvider.getUser().getUsername());
	        model.put("orgaName", applicationProvider.getOrganisation().getName());
	        model.put("portalName", mailConfig.getPortalName());
			Template t = freemarkerConfig.getTemplate("applicationprovider.ftl");
			String subject = mailConfig.getPortalName() + " - Neuer Anbieter für Organisation " + applicationProvider.getOrganisation().getName();
			String content = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
			
			sendEmail(subject, content, true, toMails.toArray(new String[0]));
			return true;
		} catch (IOException | TemplateException | MessagingException e) {
			return false;
		}
    }
    
    public boolean sendApprovedUserMail(ProviderEntity approvedProvider) {   
        try {
        	Map<String, Object> model = new HashMap<>();
            model.put("name", approvedProvider.getUser().getFullname());
            model.put("orgaName", approvedProvider.getOrganisation().getName());
            model.put("portalName", mailConfig.getPortalName());
    		Template t = freemarkerConfig.getTemplate("approvedprovider.ftl");
    		String content = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
    		String subject = mailConfig.getPortalName() + " - Freigabe als Anbieter für Organisation " + approvedProvider.getOrganisation().getName();
    		
    		sendEmail(subject, content, true, approvedProvider.getUser().getUsername());
    		return true;
		} catch (IOException | TemplateException | MessagingException e) {
			return false;
		}
    }
    
    public void sendEmail(String subject, String content, boolean html, String... to) throws MessagingException {
    	sendEmail(mailConfig.getFromAddress(), subject, content, html, to);
    }
    
    public void sendEmail(String fromAddress, String subject, String content, boolean html, String... toAddresses) throws MessagingException {
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom(fromAddress);
        helper.setTo(toAddresses);
        helper.setSubject(subject);
		helper.setText(content, html);
		sender.send(message);
    }
}
